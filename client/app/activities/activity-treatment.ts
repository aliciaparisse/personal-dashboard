/**
 * Created by parisse on 19.4.2016.
 */



/// <reference path="../../libs/jquery/jquery.d.ts"/>
/// <reference path="../../libs/highcharts/highcharts.d.ts"/>
/// <reference path="../../libs/moment/moment.d.ts"/>
/// <reference path="../../libs/highcharts/highcharts.d.ts"/>

export class ActivityTreatment {
    static createDisplayableWeekData(userId, callback) {

        var self = this,
            today = new Date(2016,2,1),
            dates = self.getLastNDates(today,7).reverse();

        console.log(dates);
        userId = "bertron";
        var url_base = window.location.origin;
        (<any>$).ajax({
            url: url_base + '/mongo/activity/userActivity',
            method: "get",
            data: {userId : userId},
            success : function(activityResult){
                var dataToDisplay=[],
                    userActivity = {};

                for(var j = 0 ; j < activityResult.length ; j++){
                    userActivity[activityResult[j].date] = activityResult[j].nbEx;
                }

                for (var i=0 ; i < dates.length ; i++){
                    if(userActivity[dates[i]] != undefined){
                        dataToDisplay.push(userActivity[dates[i]])
                    }
                    else{
                        dataToDisplay.push(0);
                    }

                }

                callback(dataToDisplay, dates)
            }
        });


    }

    static displayExerciseActivity(userId){
        var self = this;

        self.createDisplayableWeekData(userId, (dataToDisplay, dates) => {
            (<any>$)(function () {
                (<any>$)('#weekExerciseActivity').highcharts({
                    title: {
                        text: 'Week Activity',
                        x: -20 //center
                    },
                    xAxis: {
                        categories: dates
                    },
                    yAxis: {
                        title: {
                            text: 'Number of points per Day'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: ' pts'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    },
                    series: [{
                        name: 'Points per day',
                        data: dataToDisplay
                    }]
                });
            });
        });

    }

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
