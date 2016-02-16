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
                    weekNumber = parseInt(exo.name.substr((dashIn-2), 2));
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
                    weeks[weekNumber].exercises.push(exo);
                }
                //b) If there is no week zero, we shift the indexes
                else if (!foundWeek0 && weeks[weekNumber-1] != undefined){
                    weeks[weekNumber-1].exercises.push(exo);
                }
                //2) If it doesn't I create a new week and add my exercise in it
                else{
                    weeks.push({weekNb:weekNumber,exercises:[exo]});
                }
 
            }
             
        }
        //As the exercises are in order of week number, if I find a non number week, I just treat it in the end
        else {
            //I check if there is an Extra Week number
            if (weeks["Extra"] != undefined){
                weeks["Extra"].exercises.push(exo);
            }
            //2) If it doesn't I create a new week and add my exercise in it
            else{
                weeks["Extra"] ={weekNb:"Extra", exercises:[exo]};
            }
        }

    }
    return weeks;
    
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


var courseCompDiagram = function(course, cbRet){

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
                        //This is called when we go the course that we requested from the id we got
                        
                        //This creates an attribute "newName" for each exercise,
                        //to display in the tooltip
                        refactorExercises(courseConcerned);
                        
                        //This create a dataToDisplay from a courseConcerned
                        //It contains the series that will be displayed by highcharts
                        createDisplayableData(courseConcerned, dataToDisplay, doneEx);

                        //Here we check is the course is completed/finished
                        if (courseName =="hy-s2015-cee") {
                             $("#Completion"+ courseName).replaceWith('<img src="resources/compBadge.png" width="50%" >');
                        }

                        else
                        {
                            $("#Completion"+ courseName).highcharts({
                                chart: {
                                    style : {
                                        fontFamily : "Comic Sans MS"
                                    },
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
                            });
                        }
                        
                        //This is called with the course we wanted
                        cbRet(courseConcerned);
                        
                    });
                }
            }
        });
    
 }

