// Personal Dashboard Component
// Author : Alicia Parisse
// Description : 
//  	This component is the principal component of the dashboard website
// 		It is composed by a login component (only shown when user not connected),
//		a general student information component and a courses component,
//		containing all the user's courses.
// Last-comment date : 02/03/16
System.register(["angular2/core", "./courses", "./student-info", "./navbar", "./login"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, courses_1, student_info_1, navbar_1, login_1;
    var PersonalDashboard;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (courses_1_1) {
                courses_1 = courses_1_1;
            },
            function (student_info_1_1) {
                student_info_1 = student_info_1_1;
            },
            function (navbar_1_1) {
                navbar_1 = navbar_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            }],
        execute: function() {
            PersonalDashboard = (function () {
                function PersonalDashboard() {
                    this.studentName = "";
                    var self = this, cookieManager = new Cookies();
                    //We check if a cookie with the authentication token is defined
                    //Setting the loggedIn boolean will automatically change the display
                    if (cookieManager.read("oauth_token") != undefined) {
                        self.loggedIn = true;
                        self.studentName = JSON.parse(cookieManager.read("oauth_token")).username;
                    }
                    else {
                        self.loggedIn = false;
                    }
                }
                //Function that is called as an output event from the login component,
                //when the logging was a success
                PersonalDashboard.prototype.logSuccess = function (event) {
                    this.studentName = event.username;
                    this.loggedIn = true;
                };
                PersonalDashboard.prototype.unlogSuccess = function (event) {
                    this.loggedIn = false;
                };
                PersonalDashboard = __decorate([
                    core_1.Component({
                        selector: "personal-dashboard",
                        directives: [courses_1.Courses, student_info_1.StudentInfo, navbar_1.NavBar, login_1.Login],
                        template: "\n\t<login *ngIf= \"!loggedIn\" (logSuccess) =\"logSuccess($event)\"></login>\n\t<navbar [hidden]= \"!loggedIn\" (loggingOut) =\"unlogSuccess($event)\"></navbar>\n\t<div *ngIf= \"loggedIn\" class=\"row\">\n\t\t<student-info [studentName]=\"studentName\" class=\" col-xs-12 col-sm-5 col-md-3 col-lg-4\"></student-info>\n\t\t<courses class=\"col-xs-12 col-sm-7 col-md-9 col-lg-8\"></courses>\n\t</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], PersonalDashboard);
                return PersonalDashboard;
            })();
            exports_1("PersonalDashboard", PersonalDashboard);
        }
    }
});
//# sourceMappingURL=personal-dashboard.js.map