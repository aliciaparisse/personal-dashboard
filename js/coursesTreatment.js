function createDisplayableData(courseD, dispD, nbExerToPass, totalNbEx){
	var donePer = courseD.doneExercises;
	dispD.push({
		name:"Done!",
		color:"#D0EDF1",
		y:donePer
	});
	dispD.push({
		name:"To do",
		color:"#FFAE32",
		y: (nbExerToPass-donePer)
	});
	dispD.push({
		name:"To get better",
		color:"#D3D3D3",
		y: (totalNbEx - nbExerToPass)
	});
}

// function getData(){
//     var baseUrl = "http://snapshots.testmycode.net/";
//     return $.ajax({
//         headers: {
//             username: "analysis", 
//             password: //To replace with password, find a way not to send it to git

//             "Access-Control-Allow-Origin": true
//         },
//         url: baseUrl,
//         type: 'GET',
//         success: function() { console.log('GET completed'); }
//     });


// }


function donutFromCourseCompletion(course){

	var colors = Highcharts.getOptions().colors,
        //Here, we get back the exercises informations that we would really need
        courseName = course.name,
        courseData = {
                name : courseName,
                id : 42,
                lessons : [

                ],
                doneExercises:course.exercises.length
        },
        dataToDisplay = [],
        nbExerToPass = 75,
        totalNbEx = 90,
        drillDataLen,
        brightness;
    createDisplayableData(courseData, dataToDisplay, nbExerToPass, totalNbEx);
    $("#Completion"+ courseName).highcharts({
        chart: {
            type: 'pie'
        },
        exporting:{
            buttons:{
                contextButton:{
                    enabled:false
                }
            }
        },
        credits:{
            enabled:false
        },       
        title:{
            text:''
        },
        subTitle:{
            text:''
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
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Exercises',
            data: dataToDisplay,
            size: '100%',
            innerSize : '60%',
            dataLabels: {
                formatter: function () {
                    return this.y > 10 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -10
            }
        }]
    },function (chart) { // on complete
        var centerPositionW = $("#Completion"+ courseName).width() / 2,
            centerPositionH = $("#Completion"+ courseName).height() / 2,
            theText ="20%",
            myFontSize = 52;
        chart.renderer.text(theText,centerPositionW-(theText.length*myFontSize/4), centerPositionH+(myFontSize/2))
            .css({
                color: '#0000',
                fontSize: myFontSize+'px',
                textAlign: 'right'
            })
            .attr({
                zIndex: 999
            })
            .add();

    });


};

//Useful debug code

