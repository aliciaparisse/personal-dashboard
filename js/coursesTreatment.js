function createDisplayableData(courseD, dispD, doneExercises){
    var colors = getColors(3);
    totalNbEx = courseD.course.points.total_available;
    nbExerToPass = Math.round(totalNbEx * 70 /100);
    dispD.push({
		name:"Done!",
		color:colors[0],
		y:doneExercises
	});
	dispD.push({
		name:"To do",
		color:colors[1],
		y: (nbExerToPass-doneExercises)
	});
	dispD.push({
		name:"To get better",
		color:colors[2],
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

    hash = btoa(tok);
    console.log(hash);
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

//Here we pass to getData, the function that we want it to execute on success
//Params is an array of params needed for the syncFunction - can be empty
//Those parameters are the supplementary params because at least one of the param is the data retrieved by the Ajax call
function getData(id, api, syncFunc, params){
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

    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        headers: {
            'Authorization': 'Basic ' + btoa(username+':'+ password)
        },
        url: baseUrl,
        type: 'GET',
        success: function(dataReceived) {
            console.log(dataReceived);
            if (syncFunc !=null){
                console.log("My function" + syncFunc);
                syncFunc(dataReceived, params);
            }
            data = dataReceived;
        }
    });
    return data;
}


function courseCompDiagram(course){

	var courseConcerned,
        //Here, we get back the exercises informations that we would really need
        courseName = course.name,
        //This line calls the api 
        dataToDisplay = [],
        doneEx = 4,
        resTmc,
        i;

    //Get all the courses with their id and names
    getData("courses", "tmc", displayCourseById, [courseName,doneEx]);
    
 }

function displayCourseById(coursesConcerned, complParams){
    var courseName = complParams[0],
        doneEx = complParams[1];

    for (i = 0 ; i < coursesConcerned.courses.length; i++){
        if (courseName == coursesConcerned.courses[i].name){
            console.log(coursesConcerned.courses[i].id);
            getData(coursesConcerned.courses[i].id, "tmc", compDiagram, [courseName, doneEx]);
        }
    }
 }

function compDiagram(courseConcerned, complParams){
    var dataToDisplay = [],
        courseName = complParams[0],
        doneEx = complParams[1];
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
    var data = [
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
        colors = getColors(dataLen),
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
