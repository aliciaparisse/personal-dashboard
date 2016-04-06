/**
 * Created by parisse on 16.3.2016.
 */


/// <reference path="../libs/js-cookie.d.ts"/>
/// <reference path="../libs/jquery/jquery.d.ts"/>
/// <reference path="../libs/highcharts/highcharts.d.ts"/>

import {Tools} from "./../global/tools";

export class StudentInfoTreatment{
    //Function getAllStudentCourses
    //@param :  callb, boolean. True if there's a need of calling a callback function, false otherwise
    //@param :  callbackFunc, function. Facultative, the function to be called back
    //@desc : 	the goal of this function is to get all the courses by a rest call and then
    // 			to call the next step of the display tasks
    static getAllStudentCourses (callb, callbackFunc) {
        var self = this;

        //This is only called if the oauth_token is defined
        //The goal of this call is to get all the user's courses' information.

        (<any>$).ajax({
            url: "https://tmc.mooc.fi/api/beta/participant/courses",
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(Cookies.get("oauth_token")).access_token
            },
            //Now we display the info based on the received courses
            success: function (courses) {

                if (callb) {
                    callbackFunc(courses);
                }
                else {
                    self.createChart(courses);
                }
            },
            error: function (response) {
                //TODO : Do something here
            }
        });

    }

    //Function createChart
    //@param : 	courses, array. This array contains all the courses of a student
    //@desc : 	the goal of this function is to process the informations of the courses
    //			and to display them helped by highchart.
    static createChart (courses) {

        //Here we construct the data to display the student info.
        var i, j,
            curExs,
            curExo,
            dataToDisplay = [],
            colors = Tools.getColors(courses.length),
            totalNbOfExercises = 0;
        //For each course, we compute the corresponding points awarded by the students
        for (i = 0; i < courses.length; i++) {
            dataToDisplay.push({
                name: courses[i].title,
                color: colors[i],
                y: 0
            })
            curExs = courses[i].exercises;
            for (j = 0; j < curExs.length; j++) {
                curExo = curExs[j];
                //If all the exercises were passed and there are available points
                if (curExo.all_tests_passed && curExo.available_points != null) {
                    dataToDisplay[i].y += curExo.awarded_points.length;
                }
                //If there are awarded points (but not all of them)
                else if (!curExo.all_tests_passed && curExo.awarded_points != undefined) {
                    dataToDisplay[i].y += curExo.awarded_points.length;
                }

            }
            totalNbOfExercises += dataToDisplay[i].y;
        }

        // Create the chart
        (<any>$('#donutCoursesTaken')).highcharts({
            chart: {

                type: 'pie'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false
                    }
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            subTitle: {
                text: ''
            },
            yAxis: {
                title: {
                    text: 'Percentage of exercises done'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            series: [{
                name: 'Exercises',
                data: dataToDisplay,
                size: '100%',
                innerSize: '50%',
                dataLabels: {
                    formatter: function () {
                        return (this.y / totalNbOfExercises) > 0.1 ? this.point.name : null;
                    },
                    color: '#ffffff',
                    distance: -30
                }
            }]
        });

    }
}