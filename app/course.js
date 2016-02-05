System.register(['angular2/core', "../js/coursesTreatment.js"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, coursesTreatment_js_1;
    var Course;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (coursesTreatment_js_1_1) {
                coursesTreatment_js_1 = coursesTreatment_js_1_1;
            }],
        execute: function() {
            Course = (function () {
                function Course() {
                }
                Course.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    setTimeout(function () {
                        coursesTreatment_js_1.courseCompDiagram(_this.aCourse);
                        _this.exercises = _this.aCourse.exercises;
                        //console.log(this.exercises)
                    }, 1);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Course.prototype, "aCourse", void 0);
                Course = __decorate([
                    core_1.Component({
                        selector: 'course',
                        template: "\n\t<div class=\"course\">\n\t\t<h2>{{aCourse.name}}</h2>\n\t\t<div class='diag-container row'> \n\t\t\t<div class='diagram col-xs-12 col-sm-4 col-md-4 col-lg-4' id=\"Completion{{aCourse.name}}\"></div>\n\t\t\t<div class=\"col-xs-12 col-sm-4 col-md-4 col-lg-8 parent\">\n \t\t\t\t<div title=\"{{exo.newName}}\" class=\"days activity\" *ngFor=\"#exo of exercises\"></div>\n \t\t\t\t</div>\n\t\t</div>\n\t</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Course);
                return Course;
            })();
            exports_1("Course", Course);
        }
    }
});
//To re-add : 
// <div class="col-xs-12 col-sm-6 col-md-6 col-lg-8 parent" *ngFor="#exo of exercises">
// 				<div class="days activity">
// 			</div> 
//# sourceMappingURL=course.js.map