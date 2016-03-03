// Course Component
// Author : Alicia Parisse
// Description : 
//		This component is representin a course. 
//		It's composed of two things : 
//			- a diagram showing the global progression of the student on the course
//			- a list of exercises represented in weeks, with their status (completed,begun,todo)
// Last-comment date : 03/03/16
System.register(['angular2/core', "../js/coursesTreatment.js", "../js/tools.js"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, coursesTreatment_js_1, tools_js_1;
    var Course;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (coursesTreatment_js_1_1) {
                coursesTreatment_js_1 = coursesTreatment_js_1_1;
            },
            function (tools_js_1_1) {
                tools_js_1 = tools_js_1_1;
            }],
        execute: function() {
            Course = (function () {
                //Here we initialize the change detection so that we trigger it when it's needed
                function Course(cdr) {
                    this.cdr = cdr;
                }
                Course.prototype.ngAfterViewInit = function () {
                    //We get different shades of the colors we need to display it
                    this.colors = tools_js_1.getCorrColors(this.aCourse.color);
                    //This calls a function that changes the diagram with highcharts
                    //But also returns all the exercises, so we can separate them in weeks
                    this.weeks = coursesTreatment_js_1.sepExInWeeks(coursesTreatment_js_1.courseCompDiagram(this.aCourse, this.colors).exercises);
                    //Now that we have all we need is stored, we can trigger the changes
                    this.cdr.detectChanges();
                    tools_js_1.changeExercColor(this.aCourse.name, this.colors);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Course.prototype, "aCourse", void 0);
                Course = __decorate([
                    core_1.Component({
                        selector: 'course',
                        template: "\n\t<div class=\"course {{aCourse.name}}\">\n\t\t<h2>{{aCourse.title}}</h2>\n\t\t<div class='diag-container row'> \n\t\t\t<div class='col-xs-12 col-sm-12 col-md-3 col-lg-3 diagram' id=\"Completion{{aCourse.name}}\">\n\t\t\t</div>\t\t\t\n\t\t\t\n\t\t\t<div class=\"col-xs-12 col-sm-12 col-md-9 col-lg-9 parent\" *ngFor=\"#week of weeks\">\n\t\t\t\tWeek {{week.weekNb}} \n\t\t\t\t<div title=\"{{exo.newName}}\" class=\"exerc {{exo.state}}\" *ngFor=\"#exo of week.exercises\"></div> \n\t\t\t</div>\n\t\t</div>\n\t</div>"
                    }), 
                    __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
                ], Course);
                return Course;
            })();
            exports_1("Course", Course);
        }
    }
});
//# sourceMappingURL=course.js.map