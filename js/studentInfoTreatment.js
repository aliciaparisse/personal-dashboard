var getAllStudentCourses = function(callb, callbackFunc){

    $.ajax({
        // TODO : Delete 895 part when it'll be linked to the real connected person
        url: "https://hy-canary.testmycode.io/api/beta/participant/895/courses",
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + JSON.parse(getCookie("oauth_token")).access_token
        },
        //Now we display the info based on the received courses
        success : function(courses) {
            
            console.log(courses)
            if(callb) {
                callbackFunc(courses);
            }
            else{
                var i,j,
                    curExs,
                    curExo,
                    dataToDisplay = [], 
                    colors = getColors(courses.length), 
                    totalNbOfExercises = 0;
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
                        //If there are awarded points (but not all of them)
                        else if(!curExo.all_tests_passed && curExo.awarded_points != undefined){
                            dataToDisplay[i].y += curExo.awarded_points.length;
                        }

                    }
                    totalNbOfExercises += dataToDisplay[i].y;
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
                    series: [{
                        name: 'Courses',
                        data: dataToDisplay,
                        size: '100%',
                        innerSize : '40%',
                        dataLabels: {
                            formatter: function () {
                                return (this.y/totalNbOfExercises) > 0.1 ? this.point.name : null;
                            },
                            color: '#ffffff',
                            distance: -30
                        }
                    }]
                });
            }

            
        }

    });

}

var idk = function(){}
