var getAllStudentCourses = function(){

    //First we ask for the token for OAuth    
    $.ajax({
        url: 'https://hy-canary.testmycode.io/oauth/token',
        method: "post",
        data: {
                  client_id:"228e3c5cfc33605da6919b536b51a4d3b4a84ac06aa6f5db64d0964f66535f20",
                  client_secret:"8136718b825475cb108f2c47889a0e85fcbf6866b4206a606fe2f81af21aea90",
                  grant_type : 'password',
                  username : 'aparisse',
                  password : 'tmcpassword'},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        success: getInformationBasedOnToken

    });
}


var getInformationBasedOnToken = function (tokenReceived){ 
    setCookie("oauth_token", JSON.stringify(tokenReceived));
    console.log(document.cookie)
    $.ajax({
        // TODO : Delete 895 part when it'll be linked to the real connected person
        url: "https://hy-canary.testmycode.io/api/beta/participant/895/courses",
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(getCookie("oauth_token")).access_token
        },
        success : displayInfoReceivedByToken
    });
}



var displayInfoReceivedByToken = function(courses) {
    
    var i,j,
        curExs,
        curExo,
        dataToDisplay = [], 
        colors = getColors(courses.length);
    for (i = 0 ; i < courses.length ; i++){
        dataToDisplay.push({
            name : courses[i].title,
            color : colors[i],
            y : 0
        })
        curExs = courses[i].exercises;
        for (j = 0 ; j < curExs.length ; j++) {
            curExo = curExs[j];
            //If all the exercises were passed and there are available points 
            if(curExo.all_tests_passed && curExo.available_points != null) {
                dataToDisplay[i].y += curExo.awarded_points.length;
            }
            //If all the exercises were passed but there are no points available
            else if (curExo.all_tests_passed) {
                //TODO : ???
            }
            //If there are awarded points (but not all of them)
            else if(curExo.awarded_points != undefined){
                dataToDisplay[i].y += curExo.awarded_points.length;
            }

        }
    }
    
    setCookie("coursesData", JSON.stringify(courses)); 


    
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
            data: dataToDisplay,
            size: '100%',
            innerSize : '40%',
            dataLabels: {
                formatter: function () {
                    return this.y > 5 ? this.point.name : null;
                },
                color: '#ffffff',
                distance: -30
            }
        }]
    });
};
