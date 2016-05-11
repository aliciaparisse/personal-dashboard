/**
 * Created by parisse on 8.4.2016.
 */
var request = require("superagent");


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
    mainfunc: function (){
        var self = this;
        var noError = false;
        var courseListUrl = 'https://tmc.mooc.fi/api/beta/course_id_information';
        request
            .post('https://hy-canary.testmycode.io/oauth/token')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                client_id:"228e3c5cfc33605da6919b536b51a4d3b4a84ac06aa6f5db64d0964f66535f20",
                client_secret:"8136718b825475cb108f2c47889a0e85fcbf6866b4206a606fe2f81af21aea90",
                grant_type : 'password',
                username : "aparisse",
                password : "tmcpassword"})
            .end(function(err,res){

                var oauthToken = res.body;
                var noErrorFunction = function(courseList){
                    console.log("courseList");
                    console.log(courseList);
                    Promise.all(courseList.map(courseId => {
                        return new Promise((resolve, reject) => {
                            console.log("here");
                            tmcCall(`https://tmc.mooc.fi/org/hy/courses/${courseId}/points.json?api_version=7`,oauthToken, reject, (course) => {
                                Promise.all(course.sheets.map((week) => {
                                    return new Promise((resolve, reject) => {
                                        tmcCall("https://tmc.mooc.fi/org/hy/courses/" + courseId + "/points/" + week.name + ".json?api_version=7&timestamps=1",oauthToken, reject,(weekPoints) => {
                                            resolve(self.format(weekPoints));
                                        })
                                    })
                                }))
                                .then((allWeeksPerDay) => {
                                    resolve(allWeeksPerDay);
                                });

                            });
                        })
                    }))
                    .then((datas) => {
                        console.log("more like here ");
                        mergedResults = self.mergeResults(datas);
                        var mongoResults = []
                        for (var user_id in result) {
                            mongoResults.push(self.mongoFormat(user_id, result[user_id]));
                        }


                        mongoResults.reduce((previousPromise, mongoResult) =>{
                            return previousPromise
                                .then(()=> {
                                    return new Promise ((resolve, reject) => {
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
                            .then((mongoResults)=> {
                                meanUser = self.meanUser(mongoResults);

                            })
                        .then(()=>console.log("finished"))
                    })
                }

                tmcCall(courseListUrl,oauthToken, (error, courseListUrl, oauthToken) =>{
                    //console.log(error);
                    var i = 0;
                    while(noError = false && i < 100){
                        tmcCall(courseListUrl, oauthToken, (err)=>{
                            i++;
                        }, (courseList) =>{
                            noError = true;
                            noErrorFunction(courseList);
                        })

                    }
                },noErrorFunction);
            });
    },
    meanUser : function(mergedResults){
        var meanResult = {},
            nbUsersPerDate = {};
        //console.log(mergedResults);
        for (var user_id in results){
            var user_result = results[user_id];
            for (date in user_result){
                if(meanResult[date] !=undefined){
                    meanResult[date] += user_result[user_id][date];
                }
                else{
                    meanResult[date] = user_result[user_id][date];
            }



                if(nbUsersPerDate[date] != undefined){
                    nbUsersPerDate[date] +=1;
                }
                else{
                    nbUsersPerDate[date] =1;
                }
            }
        }
        console.log("meanResult");
        console.log(meanResult);
        console.log("nbUserPerDate")
        console.log(nbUsersPerDate);

        for (var date in meanResult){
            meanResult[date] /= nbUsersPerDate[date];
        }
        console.log("Final mean result");
        console.log(meanResult);
        return meanResult;
    },

    format : function(weekPoints){

        var points = weekPoints.users_to_points,
            exoPerDay = {};

        for (var user_id in points){

            for (var j = 0 ; j < points[user_id].length ; j++){
                var user_point = points[user_id][j];
                var submitTime = user_point.time.substring(0,10);

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
    mergeResults : function(dataToMerge){
        var result = {};
        for (var i = 0 ; i < dataToMerge.length ; i++){
            for (var user in dataToMerge[i]){
                var users_points = dataToMerge[i][user];
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

    },
    meanUser : function(mongoResult){
        console.log(mongoResult);
    }
};