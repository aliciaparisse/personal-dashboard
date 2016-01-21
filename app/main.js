System.register(["angular2/core", "../js/highTest.js"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, highTest_js_1;
    var App;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (highTest_js_1_1) {
                highTest_js_1 = highTest_js_1_1;
            }],
        execute: function() {
            App = (function () {
                function App() {
                }
                App.prototype.ngOnInit = function () {
                    console.log(highTest_js_1.default());
                };
                App.prototype.onSubmit = function (title) {
                    highTest_js_1.default(title);
                };
                App = __decorate([
                    core_1.Component({
                        selector: "app",
                        template: "<form (submit)=\"onSubmit(myInput.value)\">\n\t<input type=\"text\" #myInput>\n\t<div id=\"container\" style=\"height: 400px\">Hey</div>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], App);
                return App;
            })();
            exports_1("App", App);
        }
    }
});
//# sourceMappingURL=main.js.map