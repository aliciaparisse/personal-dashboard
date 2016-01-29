System.register(["angular2/core", "../js/courseMng.js", './course'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, courseMng_js_1, course_1;
    var Courses;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (courseMng_js_1_1) {
                courseMng_js_1 = courseMng_js_1_1;
            },
            function (course_1_1) {
                course_1 = course_1_1;
            }],
        execute: function() {
            Courses = (function () {
                function Courses() {
                    this.courses = courseMng_js_1.getSampleCourses();
                }
                Courses = __decorate([
                    core_1.Component({
                        selector: "courses",
                        directives: [course_1.Course],
                        template: "\n\t<div> I'm a course list\n\t\t<div *ngFor=\"#aCourse of courses\">\n\t\t\t<course\n\t\t\t[aCourse]=\"aCourse\"></course>\n\t\t</div>\t\n\t</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Courses);
                return Courses;
            })();
            exports_1("Courses", Courses);
        }
    }
});
//# sourceMappingURL=courses.js.map