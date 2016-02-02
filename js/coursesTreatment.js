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

function getData(){
    var baseUrl = "https://tmc.mooc.fi/org/hy/courses/83.json?api_version=7";
    return $.ajax({
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Authorization': 'Basic ' + btoa('aparisse:tmcpassword')
        },
        url: baseUrl,
        type: 'GET',
        success: function() { console.log('GET completed'); }
    });


}


function donutFromCourseCompletion(course){
    console.log("Haha"+getData().api_version);

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
    refactorExercises(course);
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

function addTotalPercentage (data){
    var totalNbEx = 0;
    for (i=0; i < data.length; i++){
        totalNbEx += data[i].exercisesDone;
    }
    for (i=0; i < data.length; i++){
        data[i].y =  parseFloat(data[i].exercisesDone / totalNbEx.toFixed(2));
    }

}

function allStudentCourses () {
    var colors = Highcharts.getOptions().colors,
        data = [
            {
                name : "Mathematics",
                id : 42,
                lessons : [
                ],
                donePercentage:18, 
                exercisesDone:5
            },{
                name : "Computer Science",
                id : 44,
                lessons : [
                ],
                donePercentage:79, 
                exercisesDone:12
            },{
                name : "Chemistry",
                id : 45,
                lessons : [
                ],
                donePercentage:55, 
                exercisesDone:7
            },{
                name : "English",
                id : 46,
                lessons : [
                ],
                donePercentage:42, 
                exercisesDone:2
            }
        ],
        dataToDisplay = [],
        i,
        j,
        dataLen = data.length,
        drillDataLen,
        brightness;

    addTotalPercentage(data);

    for (i = 0; i < dataLen; i += 1) {
        data[i].color = colors[i];
    }

    // Create the chart
    $('#donutCoursesTaken').highcharts({
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
            name: 'Courses',
            data: data,
            size: '100%',
            innerSize : '40%',
            dataLabels: {
                formatter: function () {
                    return this.y > 0.1 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }]
    });
    

};
