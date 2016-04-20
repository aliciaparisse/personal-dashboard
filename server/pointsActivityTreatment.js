/**
 * Created by parisse on 8.4.2016.
 */
var request = require("superagent");


var mergeResults = function(results){
    var result = {};
    for (var i = 0 ; i < results.length ; i++){
        for (var j = 0 ; j < results[i].length ; j++){
            var users_points = results[i][j];
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
}

var format = function(weekPoints){

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


}

var mongoFormat = function (user_id, user_result){
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

var tmcCall= function(url, oauthToken, callbackReject, callback){

    request
        .get(url)
        .set('Authorization', 'Bearer ' + oauthToken.access_token)
        .end(function(err, res){
            callback(res.body);
    });
}

module.exports = {
    mainfunc: function (){

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
                tmcCall(courseListUrl,oauthToken, (error) =>{
                    console.log(error);
                }, (courseList) => {
                    Promise.all(courseList.map(courseId => {
                        return new Promise((resolve, reject) => {
                            tmcCall(`https://tmc.mooc.fi/org/hy/courses/${courseId}/points.json?api_version=7`,oauthToken, reject, (course) => {
                                Promise.all(course.sheets.map((week) => {
                                    return new Promise((resolve, reject) => {
                                        tmcCall("https://tmc.mooc.fi/org/hy/courses/" + courseId + "/points/" + week.name + ".json?api_version=7&timestamps=1",oauthToken, reject,(weekPoints) => {
                                            resolve(format(weekPoints));
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
                        result = mergeResults(datas);
                        var mongoResults = []
                        for (var user_id in result) {
                            mongoResults.push(mongoFormat(user_id, result[user_id]));
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
                        .then(()=>console.log("finished"))

                    })
                });
            });
    }
};