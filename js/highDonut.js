function addTotalPercentage (data){
    var totalNbEx = 0;
    for (i=0; i < data.length; i++){
        totalNbEx += data[i].exercisesDone;
    }
    for (i=0; i < data.length; i++){
        data[i].y =  parseFloat(data[i].exercisesDone / totalNbEx.toFixed(2));
    }

}

function donutCourses () {

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
            size: '60%',
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

function donutMaths () {

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

 
    

    $('#donutMathematics').highcharts({
        chart: {
            backgroundColor: "#D0EDF1",
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
            name: 'Courses',
            data: data,
            size: '60%',
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
