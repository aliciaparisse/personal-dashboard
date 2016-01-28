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
  
    createDisplayableData(courseData, dataToDisplay, neededPercToPass);
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

