// Activity Treatment File
// Author : Alicia Parisse
// Description :
//		This file contains functions that are used to change the activities rendering
//		It's composed of three functions that are commented more in detail.
// Last-comment date : 30/05/16



/// <reference path="../../libs/jquery/jquery.d.ts"/>
/// <reference path="../../libs/highcharts/highcharts.d.ts"/>
/// <reference path="../../libs/moment/moment.d.ts"/>
/// <reference path="../../libs/highcharts/highcharts.d.ts"/>

//This line lets us export the activity treatment as a class with static function that can be called outside here.
export class ActivityTreatment {

    //Function createDisplayableData
    //@param :  userId, string. The id/name of the user that is currently connected
    //@param :  callback, function. The function that has to be called back when this function is finished
    //@desc : 	the goal of this function is to get all the activity of the user and to create datas that can be used
    // 			directly by highcharts.
    static createDisplayableData(userId, callback) {

        var today = new Date();

        var self = this,
            //We get an array containing the last 365 days from today
            dates = self.getLastNDates(today,365).reverse();

        //We do an ajax call to our Database to get all the activities line that correspond to our user
        var url_base = window.location.origin;
        (<any>$).ajax({
            url: url_base + '/mongo/activity/userActivity',
            method: "get",
            data: {userId : userId},
            success : function(activityResult){
                var dataToDisplay=[],
                    userActivity = {};

                //We iterate through the results and fill the userActivity with the results but formated differently
                //Instead of having a JSON object for each line of the colleciton, we now have
                //["date1" : nbEx1, "date2" : nbEx2 ...]
                for(var j = 0 ; j < activityResult.length ; j++){
                    userActivity[activityResult[j].date] = activityResult[j].nbEx;
                }

                //We iterate through the dates and we fill the dataToDisplay.
                //For each day, if there is a result in userActivity, we add it for this date, but if there
                //isn't, we add a 0 value so that all the dates are still represented.
                for (var i=0 ; i < dates.length ; i++){
                    var year = dates[i].slice(0,4),
                        month = dates[i].slice(5,7),
                        day = dates[i].slice(8,10);
                    var curDate = Date.UTC(year, month-1, day);
                    if(userActivity[dates[i]] != undefined){
                        dataToDisplay.push([
                            curDate,
                            userActivity[dates[i]]
                        ])
                    }
                    else{
                        dataToDisplay.push([
                            curDate,
                            0]);
                    }

                }

                //We use the callback function and we give it the dataToDisplay (representing a year)
                callback(dataToDisplay)
            }
        });


    }

    //Function displayExerciseActivity
    //@param :  userId, string. The id/name of the user that is currently connected
    //@param :  callback, function. The function that has to be called back when this function is finished
    //@desc : 	the goal of this function is to display the data that we got in createDisplayableData, change
    // 			it a little first and then send it to highcharts.
    static displayExerciseActivity(userId, callback){
        var self = this;

        //Here we have two calls to createDisplayableData. The first one is called with the userId that we got from
        //the main application, and the second one calls for the data of the averageUser. This user is to be displayed
        //on the same graph as the user data, so the user can compare himself to the average.
        self.createDisplayableData(userId, (dataToDisplay) => {
            self.createDisplayableData("averageUser", (averageDataToDisplay) => {

                //This is the call to Highcharts to which we give two "series". They are two plots that will
                //be represented for the last week and represent user and averageUser activities.
                (<any>$)('#weekExerciseActivity').highcharts({
                    title: {
                        text: 'Week Activity',
                        x: -20 //center
                    },
                    xAxis: {
                        type: 'datetime',
                        dateTimeLabelFormats: { // don't display the dummy year
                            month: '%e. %b',
                            year: '%b'
                        },
                        title: {
                            text: 'Date'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Number of points per day'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        name: 'Your number of points',
                        data: dataToDisplay.slice(-7)
                    },  {
                        name: 'Average number of points',
                        data: averageDataToDisplay.slice(-7)
                    }]
                });

                //Here is the same as last call to highcharts. The few changes are the following : it's not the same
                //type of chart and we do not "slice" the datas, we represent all the last 365 days.
                (<any>$)("#zoomExerciseActivity").highcharts({
                    chart: {
                        zoomType: 'x'
                    },
                    title: {
                        text: 'Yearly Activity'
                    },
                    subtitle: {
                        //Responsive design
                        text: document.ontouchstart === undefined ?
                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                    },
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: {
                        title: {
                            text: 'Number of points per day'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    series: [{
                        type:'area',
                        name: 'Your number of points',
                        data: dataToDisplay
                        }, {
                        name: 'Average number of points',
                        data: averageDataToDisplay
                    }
                    ]
                });
            })
        });

        callback();

    }

    //Function getLastNDates
    //@param :  startDate, Date. The date where you have to start going back (Careful, it's not the first day of the period
    //          you're asking, it is the last)
    //@param :  nbOfDays, integer. The number of days you need
    //@desc : 	the goal of this function is to return a list of the last nbOfDays dates, where the last Date is startDate
    //@return : array of the last nbOfDaysDates
    static getLastNDates(startDate, nbOfDays) {
        var dateArray = [];
        var currentDate = moment(startDate);
        for (var i=0; i<nbOfDays; i++){
            dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
            currentDate = moment(currentDate).subtract(1, 'days');
        }
        return dateArray;
    }
}
