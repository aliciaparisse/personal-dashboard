// Points Activity Treatment
// Author : Alicia Parisse
// Description :
//		This file is meant to contain a lot of different functions including one that's called every hour by the server
//      The global goal of all those functions is to maintain up to date the database containing the activity of the
//      students, e.g. how many points they get every day, e.g. how many exercises they do.
//      Each function is more detailed, see below.
// Last-comment date : 30/05/16

var request = require("superagent");
var fs = require('fs');

//This function simply calls the tmc server and asks for information.
//It is very generic and meant to be used in a lot of different spots in the code.
var tmcCall= function(url, oauthToken, callbackReject, callback){
    request
        .get(url)
        .set('Authorization', 'Bearer ' + oauthToken.access_token)
        .end(function(err, res){
            if(err){
                callbackReject(err)
            }
            else {
                callback(res.body);
            }
    });
}

module.exports = {

    //Function mainfunc
    //@desc : 	the goal of this function is to gather all the information that are needed to construct the activity
    //          database and then to send the information to the database.
    // Attention !! This function uses a lot the concept of Javascript Promises. If you don't know about it at all,
    // inform yourself before trying to understand this function.
    mainfunc: function (){
        var self = this;
        var noError = false;

        //First we get the list of ids of the courses that are on the tmc server, in order to construct the url later.
        var courseListUrl = 'https://tmc.mooc.fi/api/beta/course_id_information';
        request
            .post('https://tmc.mooc.fi/oauth/token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                client_id:"228e3c5cfc33605da6919b536b51a4d3b4a84ac06aa6f5db64d0964f66535f20",
                client_secret:"8136718b825475cb108f2c47889a0e85fcbf6866b4206a606fe2f81af21aea90",
                grant_type : 'password',
                username : "aparisse",
                password : "tmcpassword"})
            .end(function(err,res){


                //Once we have the list of ids, we treat each course
                if(res != undefined) {
                    var oauthToken = res.body;
                    //Here we define the "noErrorFunction" that'll be called if and only if there' no problem with the previous request
                    var noErrorFunction = function (courseList) {

                        //Here we map the list of ids with an action that's called for every id.
                        //Promise.all will launch all the promises at once (the promises created from the id list)
                        Promise.all(courseList.map(courseId => {
                                return new Promise((resolve, reject) => {

                                    //For every course, we call this
                                    //The result is a course description, containing all the week names
                                    //A course is divided in Lessons/Weeks. We need the name of each Lesson to get all the points.
                                    //You can see that the URL is created with the current courseId
                                    tmcCall(`https://tmc.mooc.fi/org/hy/courses/${courseId}/points.json?api_version=7`, oauthToken, reject, (course) => {
                                        //Once again we use Promise.all to iterate through the weeks of a course
                                        Promise.all(course.sheets.map((week) => {
                                                return new Promise((resolve, reject) => {
                                                    //For every week name that we receive (in the array), we call the following
                                                    //The result is an object containing timestamps.
                                                    //The result is composed of users that are themselves composed of timestamps.
                                                    //A timestamp is in fact just a date (date at which the user got a point).
                                                    tmcCall("https://tmc.mooc.fi/org/hy/courses/" + courseId + "/points/" + week.name + ".json?api_version=7&timestamps=1", oauthToken, reject, (weekPoints) => {
                                                        //When the result is received it is first formated (see format function)
                                                        //Then it is send back to the promise.all call
                                                        resolve(self.format(weekPoints));
                                                    })
                                                })
                                            }))
                                            //This is called only when all the promises called in the Promise.all (the 2nd one) are finished
                                            .then((allWeeksPerDay) => {
                                                //Promise.all takes all the weekPoints that it receives (see few lines above)
                                                //and puts them all in an array when all the promises are finished
                                                //Now that they all are finished, we can send the result.
                                                resolve(allWeeksPerDay);
                                            });

                                    });
                                })
                            }))
                            //Once again this is done when the second Promise.all has finished, so when all of the tmcCalls
                            //that we did are finished
                            .then((datas) => {
                                //First we compute a averageUser based on all the results that we have in datas
                                var averageUser = self.meanUser(datas);

                                //This formats to mongoDB spec the averageUser that we computed
                                mongoAverageUser = self.mongoFormat("averageUser", averageUser);
                                //This sends the formated mongoAverageUser to mongoDB server
                                request
                                    .put('http://localhost:3000/mongo/activity/upsertMultiple')
                                    .set('Content-Type', 'application/json')
                                    .send(JSON.stringify(mongoAverageUser))
                                    .end(function (err, res) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log(res.statusCode);
                                        }
                                    });

                                //Then we merge the results : between the different weeks and between the different courses
                                //Because for now, each week of each course as a user object. But it's possible that a user
                                //worked on multiple courses or on multiples weeks of the same course.
                                mergedResults = self.mergeResults(datas);

                                //Now we also format the mergedResults to mongoDB specification
                                var mongoResults = []
                                for (var user_id in result) {
                                    mongoResults.push(self.mongoFormat(user_id, result[user_id]));
                                }

                                //And now we use reduce to send sequentially a request to the mongoDB Server for each user
                                //contained in the mongoResults.
                                mongoResults.reduce((previousPromise, mongoResult) => {
                                        return previousPromise
                                            .then(()=> {
                                                return new Promise((resolve, reject) => {
                                                    request
                                                        .put('http://localhost:3000/mongo/activity/upsertMultiple')
                                                        .set('Content-Type', 'application/json')
                                                        .send(JSON.stringify(mongoResult))
                                                        .end(function (err, res) {
                                                            if (err) {
                                                                reject(err);
                                                            }
                                                            else {
                                                                resolve(res);
                                                            }
                                                         });
                                                });
                                            });
                                    }, Promise.resolve())
                                    .then(()=>console.log("finished"))
                            })
                    }

                    //This was created because the request to get the courseId sometimes has problems
                    //If it does then, we just retry a few times. And when it works we launch the noErrorFunction.
                    //If the number of times this is called is not sufficient to get a positive answer, then it'll work next call
                    tmcCall(courseListUrl, oauthToken, (error, courseListUrl, oauthToken) => {
                        var i = 0;
                        while (noError = false && i < 5) {
                            tmcCall(courseListUrl, oauthToken, (err)=> {
                                i++;
                            }, (courseList) => {
                                noError = true;
                                noErrorFunction(courseList);
                            })

                        }
                    }, noErrorFunction);
                }
            });
    },

    //Function format
    //@param : datas, Javascript Object. The composition of this object is described above
    //@desc : 	the goal of this function is to transform the result of all the tmcCall to the points API into an average object.
    //          The object will be composed only of dates and mean number of exercise for the corresponding date
    //@return : Returning the formated object.
    meanUser : function(datas){
        var addedResults =  {},
            nbUsersPerCourse = {};

        //First we iterate through all the datas and add all the exercises to a global addedResults variable for each course
        //But at the same time we keep track of the number of Users per course (to use it later)
        for (var i = 0 ; i < datas.length ; i++){
            var course = datas[i];
            if(course[0] == undefined){
            }
            else {
                nbUsersPerCourse[i] = Object.keys(course[0]).length;
                for (var j = 0 ; j < course.length ; j++){
                    var week = course[j];
                    for (var user_id in week){
                        var user_result = week[user_id]
                        for (date in user_result){
                            if (addedResults[i] != undefined){
                                if(addedResults[i][date] !=undefined){
                                    addedResults[i][date] += user_result[date];
                                }
                                else{
                                   addedResults[i][date] = user_result[date];
                                }

                            }
                            else{
                                addedResults[i] = {};
                                addedResults[i][date] = user_result[date];
                            }
                        }
                    }
                }
            }

        }

        var meanResult = {},
            nbUsersPerDate = {};
        //Now we have one big object composed of courses with a lot of dates and a high number of exercises
        //(representing the number of exercises done all over the course each day)
        //So we iterate through the courses and add all the result to one big meanResult object
        //And we keep track of the number of users per day, using the number of users per course that we had from before
        for (var courseId in addedResults){
            var course = addedResults[courseId];
            for (var date in course){
                if(meanResult[date] != undefined){
                    meanResult[date] += course[date];
                }
                else {
                    meanResult[date] = course[date];
                }

                if(nbUsersPerDate[date] != undefined){
                    nbUsersPerDate[date] += nbUsersPerCourse[courseId];
                }
                else{
                    nbUsersPerDate[date] = nbUsersPerCourse[courseId];
                }

            }
        }
        //Now that we know how many users there were per day and how many exercises were done, we can simply compute the mean
        for (var date in meanResult){
            meanResult[date] = Math.round(10 * meanResult[date] / nbUsersPerDate[date]) / 10;
        }

        return meanResult;
    },

    //Function format
    //@param : weekPoints, Javascript Object. The composition of this object is described above
    //@desc : 	the goal of this function is to transform the result of the tmcCall to the points API into an easily
    //          understandable object. The object will now be composed of users, containing a certain number of points
    //          for the days they worked on.
    //@return : Returning the formated object.
    format : function(weekPoints){

        var points = weekPoints.users_to_points,
            exoPerDay = {};
        //Here we go through the users object
        for (var user_id in points){
            //Here we go through the list of dates inside the user object
            for (var j = 0 ; j < points[user_id].length ; j++){
                var user_point = points[user_id][j];
                var submitTime = user_point.time.substring(0,10);

                //We transform the date and add a point for timestamp to the corresponding user and date
                if(exoPerDay[user_id] != undefined){
                    if(exoPerDay[user_id][submitTime] != undefined){
                        exoPerDay[user_id][submitTime] += 1;
                    }
                    else{
                        exoPerDay[user_id][submitTime] = 1;
                    }
                }
                else{
                    exoPerDay[user_id] = {};
                    exoPerDay[user_id][submitTime] = 1;
                }
            }
        }

        return exoPerDay;


    },

    //Function mergeResults
    //@param :  dataToMerge, Javascript Object. This object is composed of courses, composed of weeks, composed of users,
    //          composed of dates that correspond to number of Exercises.
    //@desc : 	the goal of this function is to merge the results of all the calls to the tmc API. From a composed object,
    //          only get an object containing users and dates
    //@return : Returning the merged object.
    mergeResults : function(dataToMerge){
        var result = {};
        //We iterate through the courses
        for (var i = 0 ; i < dataToMerge.length ; i++){
            //We iterate through weeks
            for (var user in dataToMerge[i]){
                //We iterate through users
                var users_points = dataToMerge[i][user];
                //We iterate though dates
                for(var user_id in users_points){
                    var dateEntry = users_points[user_id];
                    for (var date in dateEntry){
                        if(result[user_id] != undefined){
                            if (result[user_id][date] != undefined){
                                result[user_id][date] += dateEntry[date];
                            }
                            else{
                                result[user_id][date] = dateEntry[date];
                            }
                        }
                        else{
                            result[user_id]={};
                            result[user_id][date] = dateEntry[date];
                        }
                    }
                }
            }

        }
        return result;
    },

    //This function transforms JSON composed object into JSON simple objects that can be send to mongoDB directly
    mongoFormat : function (user_id, user_result){
        var mongoResult = [];

        for(var date in user_result){

            mongoResult.push({
                userId: user_id,
                date : date,
                nbEx : user_result[date]
            });
        }
        return mongoResult;

    }
};