// Student Information Component
// Author : Alicia Parisse
// Description : 
//		This component is the a component that is meant to stay visible 
//		all the time, and give general information about the student.
// Last-comment date : 03/03/16
System.register(["angular2/core", "../js/studentInfoTreatment.js"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, studentInfoTreatment_js_1;
    var StudentInfo;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (studentInfoTreatment_js_1_1) {
                studentInfoTreatment_js_1 = studentInfoTreatment_js_1_1;
            }],
        execute: function() {
            StudentInfo = (function () {
                function StudentInfo() {
                    studentInfoTreatment_js_1.getAllStudentCourses(false);
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], StudentInfo.prototype, "studentName", void 0);
                StudentInfo = __decorate([
                    core_1.Component({
                        selector: "student-info",
                        template: "\n\t<div> <h1>Welcome to your personal dashboard, {{studentName}}!</h1>\n\t\t<div class='diag-container'> \n\t\t\t<div id=\"donutCoursesTaken\"></div>\n\t\t</div>\n\t</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], StudentInfo);
                return StudentInfo;
            }());
            exports_1("StudentInfo", StudentInfo);
        }
    }
});
//# sourceMappingURL=student-info.js.map