System.register(["angular2/core"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var Exercises;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Exercises = (function () {
                function Exercises() {
                }
                Exercises.prototype.ngOnChanges = function (changeRecord) {
                    console.log(weeks);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Object)
                ], Exercises.prototype, "weeks", void 0);
                Exercises = __decorate([
                    core_1.Component({
                        selector: "exercises",
                        template: "\n\t<div *ngFor=\"#week of weeks\">\n\n\t</div>\n\t\t\n \t"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Exercises);
                return Exercises;
            })();
            exports_1("Exercises", Exercises);
        }
    }
});
//Week {{week.weekNb}}  <div class="days activity" *ngFor="#exo of week.exercises"></div> 
//# sourceMappingURL=exercises.js.map