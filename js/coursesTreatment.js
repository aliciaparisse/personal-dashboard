function createDisplayableData(courseD, dispD, doneExercises){
    totalNbEx = courseD.course.points.total_available;
    nbExerToPass = Math.round(totalNbEx * 70 /100);
    dispD.push({
		name:"Done!",
		color:"#D0EDF1",
		y:doneExercises
	});
	dispD.push({
		name:"To do",
		color:"#FFAE32",
		y: (nbExerToPass-doneExercises)
	});
	dispD.push({
		name:"To get better",
		color:"#D3D3D3",
		y: (totalNbEx - nbExerToPass)
	});
}

function testAjax(){
    var baseUrl, 
        username,
        password,
        data,
        hash,
        tok;
    
    baseUrl =  "http://snapshots.testmycode.net";
    username= "analysis";
    password = "FArUK69:<*;MQdUL&^Y&ag,m?~j4fusD";
    tok = username+":"+password;
    hash = Base64.encode(tok);
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Authorization': 'Basic '+hash
        },
        url: baseUrl,
        type: 'GET',
        //TODO : replace this
        async:false,
        success: function(dataReceived) { 
            console.log(dataReceived);
            data = dataReceived;
        }
    });
    return data;  
}

function getData(id, api){
    //Here we define all the params that we will need for the request
    var baseUrl, 
        username,
        password,
        data;
    if (api == "tmc"){
        if(isNaN(id)){
            baseUrl = "https://tmc.mooc.fi/org/hy/courses.json?api_version=7&show_unlock_conditions=1&show_points=1";          
        }
        else{
            baseUrl = "https://tmc.mooc.fi/org/hy/courses/"+id+".json?api_version=7&show_unlock_conditions=1&show_points=1";    
        }
        username = "aparisse";
        password = "tmcpassword";
    }
    else if (api == "snp"){
        baseUrl =  "http://snapshots.testmycode.net";
        username= "analysis";
        password = "FArUK69:<*;MQdUL&^Y&ag,m?~j4fusD";  
    }

    // baseUrl = "https://tmc.mooc.fi/org/hy/courses.json?api_version=7&show_unlock_conditions=1&show_points=1";          
        
    // username = "aparisse";
    // password = "tmcpassword";

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Authorization': 'Basic ' + btoa(username+':'+ password)
        },
        url: baseUrl,
        type: 'GET',
        //TODO : replace this
        async:false,
        success: function(dataReceived) { 
            console.log(dataReceived);
            data = dataReceived;
        }
    });
    return data;
}

function getCourseData(courseName){
    var i,
        course,
        resTmc;
    //Get all the courses with their id and names
    resTmc = getData("courses", "tmc");
    
    for (i = 0 ; i < resTmc.courses.length; i++){
        if (courseName == resTmc.courses[i].name){
            console.log(resTmc.courses[i].id);
            return getData(resTmc.courses[i].id, "tmc");
        }
    }
}


function donutFromCourseCompletion(course){

	var colors = Highcharts.getOptions().colors,
        //Here, we get back the exercises informations that we would really need
        courseName = course.name,
        //This line calls the api 
        //courseData = getCourseData(courseName),
        courseConcerned,
        dataToDisplay = [],
        doneEx = 4,
        drillDataLen,
        brightness;
    //testAjax();
    courseConcerned = getCourseData(courseName);
    createDisplayableData(courseConcerned, dataToDisplay, doneEx);
    
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
                text: 'Number of exercises done'
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
