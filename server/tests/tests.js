/**
 * Created by parisse on 21.4.2016.
 */

var fs = require('fs')
var activityTreatment = require('./../pointsActivityTreatment')
var chai = require('chai');
var request = require("superagent");
var expect = chai.expect;



describe("Test Points Activity Treatment", () => {
    var oauthToken;
    before(() => {
        return new Promise((resolve, reject) =>
        {
            request
                .post('https://tmc.mooc.fi/oauth/token')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    client_id: "ffb9fccb2a873a9eaa56ef3d2624ddce9dff60d51cf423f52af5db020c51c580",
                    client_secret: "f33e39d88736beb471048f56bc86a6f8f7ede82382383cef1283fc21ab633705",
                    grant_type: 'password',
                    username: "aparisse",
                    password: "tmcpassword"
                })
                .end(function (err, res) {
                    if (err) {
                        reject(err);
                    }
                    else{
                        oauthToken = res.body;
                        resolve(oauthToken);
                    }
                }
            );
        });
    });


    describe("Testing formatting", () => {
        var course1, course2, mergedResult;

        before(() => {
            return new Promise((resolve, reject) =>
            {
                request
                    .get("https://tmc.mooc.fi/org/hy/courses/68/points/week7.json?api_version=7&timestamps=1")
                    .set('Authorization', 'Bearer ' + oauthToken.access_token)
                    .end(function(err, res){
                        if (err){
                            reject(err);
                        }
                        else {
                            course1 = res.body;
                            resolve(res.body);
                        }
                    });
            });
        });

        it("Testing the formating of a single course", (done) => {
            var expectedRes = JSON.parse(fs.readFileSync('./server/tests/output/formatSingleCourse.json'));
            expect(activityTreatment.format(course1)).to.eql(expectedRes);
            done();
        });

        it("Testing the merge of two courses", (done) => {
            request
                .get("https://tmc.mooc.fi/org/hy/courses/68/points/week8.json?api_version=7&timestamps=1")
                .set('Authorization', 'Bearer ' + oauthToken.access_token)
                .end((err, res) => {
                    var courses = [];
                    course2 = res.body;
                    courses.push(activityTreatment.format(course1));
                    courses.push(activityTreatment.format(course2));
                    var expectedRes = JSON.parse(fs.readFileSync('./server/tests/output/mergedTwoCourses.json'));
                    mergedResult = activityTreatment.mergeResults([courses]);
                    expect(mergedResult).to.eql(expectedRes);
                    done();
                });
        });

        it("Testing the formatting for pushing to mongodb", (done) => {
            var mongoResults = []
            for (var user_id in mergedResult) {
                mongoResults.push(activityTreatment.mongoFormat(user_id, mergedResult[user_id]));
            }
            var expectedRes = JSON.parse(fs.readFileSync('./server/tests/output/formatMongoDb.json'));
            expect(mongoResults).to.eql(expectedRes);
            done();
        });

        it("Testing the formatting into average user", (done) => {
            var unmergedData = JSON.parse(fs.readFileSync('./server/tests/input/unmergedResult.json'));
            var expectedResult = JSON.parse(fs.readFileSync('./server/tests/output/averageUser.json'));
            expect(activityTreatment.meanUser(unmergedData)).to.eql(expectedResult);
            done();
        })
    });
});