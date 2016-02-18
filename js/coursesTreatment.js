//This function both creates a displayableData table
//And changes the exercises of the studentCourse so that
//We can more easily show the state of each exercise
var createDisplayableData = function(studentC){

    var dataToDisplay = [],
        colors = getColors(3), 
        finishedE = 0, 
        begunE = 0,
        //TODO : add a way to find the number of exercises to validate !
        leftE = 0,
        totalNbEx = 0,
        curExo;
    for (var i = 0 ; i < studentC.exercises.length ; i++){
        curExo = studentC.exercises[i];
        if(curExo.all_tests_passed && curExo.available_points != null) {
            finishedE+= curExo.awarded_points.length;
            curExo.state = "completed";
        }
        else if (!curExo.all_tests_passed && curExo.awarded_points != null){
            begunE+= curExo.awarded_points.length;
            curExo.state = "begun";
        }
        else{
            curExo.state = "todo";
        }

        if(curExo.available_points!= null){
            totalNbEx += curExo.available_points.length;
        }
    }
    leftE = totalNbEx - finishedE - begunE;

    dataToDisplay.push({
        name:"Done exercises",
        color : colors[0],
        y:finishedE
    });
    dataToDisplay.push({
        name:"Begun exercises",
        color : colors[1],
        y:begunE
    });
    dataToDisplay.push({
        name:"Exercises left to do",
        color : colors[2],
        y:leftE
    });

    return dataToDisplay;


}

var sepExInWeeks = function(exercises){
    var weeks = [],
        i,
        exo,
        weekNumber,
        shiftValue = 0,
        firstWeek = true,
        foundWeek0 = false;
    //We iterate through the exercises to check of what week they're part
    for (i = 0 ; i < exercises.length ; i++){
        exo = exercises[i];
        if (exo.exercise_name.indexOf('-') != -1){
            dashIn = exo.exercise_name.indexOf('-');
            //I check if I have a week number
            if(!isNaN(exo.exercise_name[dashIn -1])){
                //I check if I have a week number with 2 digits
                if(!isNaN(exo.exercise_name.substring((dashIn-2), (dashIn-1)))){
                    weekNumber = parseInt(exo.exercise_name.substr((dashIn-2), 2));
                }
                else {
                    weekNumber =  parseInt(exo.exercise_name[dashIn-1]); 
                }

                
                //Because we assume that if there's a week 0, it will be first
                if(weekNumber ==0 && !foundWeek0){
                    foundWeek0 = true;
                }


                if(firstWeek) {
                    firstWeek = false;
                    shiftValue = weekNumber;
                }
                if(weekNumber < shiftValue){
                    shiftValue = weekNumber;
                }


                //If I do, I get this number and add it to weeks
                //1) If it already exists, add it to a week element
                //a) If there exist a week zero we dont shift the indexes
                
                // if (foundWeek0 && weeks[weekNumber] != undefined){
                //     weeks[weekNumber].exercises.push(exo);
                // }
                // //b) If there is no week zero, we shift the indexes
                // else if (!foundWeek0 && weeks[weekNumber-1] != undefined){
                //     weeks[weekNumber-1].exercises.push(exo);
                // }
                // //2) If it doesn't I create a new week and add my exercise in it
                // else{
                //     weeks.push({weekNb:weekNumber,exercises:[exo]});
                // }
                if(weeks[(weekNumber.toString())] != undefined){
                    weeks[(weekNumber.toString())].exercises.push(exo);
                }
                else {
                    weeks[(weekNumber.toString())] = {weekNb : (weekNumber.toString()), exercises:[exo]}
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

    for (var i = 0 ; i<shiftValue; i++){
        weeks.shift();
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



var courseCompDiagram = function(studentCourse){

	var dataToDisplay = [],
        courseName = studentCourse.name;

    
    //This creates an attribute "newName" for each exercise,
    //to display in the tooltip
    refactorExercises(studentCourse);
    
    //This create a dataToDisplay from the studentCourse
    //It contains the series that will be displayed by highcharts4
    dataToDisplay = createDisplayableData(studentCourse)

    
    //Here we check is the course is completed/finished
    if ((dataToDisplay[2].y == 0) && (dataToDisplay[1].y == 0)) {
         $("#Completion"+ courseName).replaceWith('<img src="resources/compBadge.png" width="50%" >');
    }
    //If it's not we display normally
    else
    {
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
        });
    }
    
    return studentCourse; 
    
 }

