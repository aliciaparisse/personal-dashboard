var createDisplayableData = function(courseD, dispD, doneExercises){
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



var addTotalPercentage = function(data){
    var totalNbEx = 0;
    for (i=0; i < data.length; i++){
        totalNbEx += data[i].exercisesDone;
    }
    for (i=0; i < data.length; i++){
        data[i].y =  parseFloat(data[i].exercisesDone / totalNbEx.toFixed(2));
    }
}

var sepExInWeeks = function(exercises){
    var weeks = [],
        i,
        exo,
        weekNumber,
        foundWeek0 = false;
    //We iterate through the exercises to check of what week they're part
    for (i = 0 ; i < exercises.length ; i++){
        exo = exercises[i];
        if (exo.name.indexOf('-') != -1){
            dashIn = exo.name.indexOf('-');
            //I check if I have a week number
            if(!isNaN(exo.name[dashIn -1])){
                //I check if I have a week number with 2 digits
                if(!isNaN(exo.name.substring((dashIn-2), (dashIn-1)))){
                    weekNumber =  parseInt(exo.name.substr((dashIn-2), 2));
                }
                else {
                    weekNumber =  parseInt(exo.name[dashIn-1]); 
                }

                //Because we assume that if there's a week 0, it will be first
                if(weekNumber ==0 && !foundWeek0){
                    foundWeek0 = true;
                }

                //If I do, I get this number and add it to weeks
                //1) If it already exists, add it to a week element
                //a) If there exist a week zero we dont shift the indexes
                if (foundWeek0 && weeks[weekNumber] != undefined){
                    weeks[weekNumber].push(exo);
                }
                //b) If there is no week zero, we shift the indexes
                else if (weeks[weekNumber-1] != undefined){
                    weeks[weekNumber-1].push(exo);
                }
                //2) If it doesn't I create a new week and add my exercise in it
                else{
                    weeks.push([exo]);
                }
 
            }
             
        }
        //As the exercises are in order of week number, if I find a non number week, I just treat it in the end
        else {
            //I check if there is an Extra Week number
            if (weeks["Extra"] != undefined){
                weeks["Extra"].push(exo);
            }
            //2) If it doesn't I create a new week and add my exercise in it
            else{
                weeks["Extra"] =[exo];
            }
        }

    }
    
}

var testAjax = function(){
    var baseUrl, 
        username,
        password,
        data,
        hash,
        tok;
    
    baseUrl =  "http://snapshots.testmycode.net:80";
    username= "analysis";
    password = "FArUK69:<*;MQdUL&^Y&ag,m?~j4fusD";
    tok = username+":"+password;

    hash = btoa(tok);
    console.log(hash);
    $.ajax({
        xhrFields: {
            withCredentials: true
        },
        // username : username,
        // password : password,
        headers: {
            'Authorization': 'Basic '+hash,
        },
        url: baseUrl,
        type: 'GET',
        //TODO : replace this
        success: function(dataReceived) { 
            console.log(dataReceived);
            data = dataReceived;
        }
    });
    return data;  
}

//Here we pass to getData, the function that we want it to execute on success
var getData = function(id, api, syncFunc){
    //Here we define all the params that we will need for the request
    var baseUrl, 
        username,
        password,
        data;

    //If the function to launch after the success
    if (syncFunc == null){
        var syncFunc = function(dataReceived){};
    }

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
        success: syncFunc
    });
    return data;
}


var courseCompDiagram = function(course){

	var courseConcerned,
        //Here, we get back the exercises informations that we would really need
        courseName = course.name,
        //This line calls the api 
        dataToDisplay = [],
        doneEx = 4,
        resTmc,
        i;
    //testAjax();
    //Get all the courses with their id and names and call back
    //to the next function in order to get the id of the concerned course
    getData("courses", "tmc",
        function (coursesConcerned){

            for (i = 0 ; i < coursesConcerned.courses.length; i++){
                if (courseName == coursesConcerned.courses[i].name){
                    //Get the course information and display it using the callback function
                    getData(coursesConcerned.courses[i].id, "tmc", function (courseConcerned){
                        createDisplayableData(courseConcerned, dataToDisplay, doneEx);
                        sepExInWeeks(courseConcerned.course.exercises);
                        console.log(courseConcerned);
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
                    });
                }
            }
        });
    
 }




var allStudentCourses = function() {
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
