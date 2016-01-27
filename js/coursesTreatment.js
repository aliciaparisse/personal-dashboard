function createDisplayableData(courseD, dispD, needPer){
	var donePer = courseD.donePercentage;
	dispD.push({
		name:"Done!",
		color:"#D0EDF1",
		y:donePer
	});
	dispD.push({
		name:"To do",
		color:"#FFAE32",
		y: (needPer-donePer)
	});
	dispD.push({
		name:"To get better",
		color:"#D3D3D3",
		y: (100 - needPer)
	});
}

function donutFromCourseCompletion(courseName){

    console.log(courseName)
	var colors = Highcharts.getOptions().colors,
        //Here, we get back the exercises informations that we would really need
        courseData = {
                name : courseName,
                id : 42,
                lessons : [

                ],
                donePercentage:18, 
                exercisesDone:5
        },
        dataToDisplay = [],
        neededPercToPass = 80,
        drillDataLen,
        brightness,
        divName =courseName+"Completion";
    jQuery.fn.exists = function(){return this.length>0;}
    console.dir($("#Completion" +courseName));
    // if ($("#Completion" +courseName).exists()) {
    //     console.log("Of course !!");
        
    // }
    $("#Completion" +courseName).text("HAHA");

    createDisplayableData(courseData, dataToDisplay, neededPercToPass);
    $("#CompletionMathematics").highcharts({
        chart: {
            type: 'pie'
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
            size: '60%',
            innerSize : '40%',
            dataLabels: {
                formatter: function () {
                    return this.y > 10 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -10
            }
        }]
    });


};

//Useful debug code

