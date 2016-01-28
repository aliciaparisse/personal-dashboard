System.register(["angular2/core", "./courses", "./student-info"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, courses_1, student_info_1;
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
            }],
        execute: function() {
            PersonalDashboard = (function () {
                function PersonalDashboard() {
                }
                PersonalDashboard = __decorate([
                    core_1.Component({
                        selector: "personal-dashboard",
                        directives: [courses_1.Courses, student_info_1.StudentInfo],
                        template: "\n\t<div class=\"row\">\n\t\t<student-info class=\"student-info col-xs-12 col-sm-6 col-md-5 col-lg-4\"></student-info>\n\t\t<courses class=\"col-xs-12 col-sm-6 col-md-7 col-lg-8\"></courses>\n\t</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], PersonalDashboard);
                return PersonalDashboard;
            })();
            exports_1("PersonalDashboard", PersonalDashboard);
        }
    }
});
//REUSABLE CODE
// template:`<form (submit)="onSubmit(myInput.value)">
// 	<input type="text" #myInput>
// 	<div id="container" style="height: 400px">Hey</div>`
// })
// export class PersonalDashboard{
// 	ngOnInit(){
// 		console.log(createChart());
// 	}
// 	onSubmit(title){
// 		modifyChart(title);
// 	}
// }
//# sourceMappingURL=personal-dashboard.js.map