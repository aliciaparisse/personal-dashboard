// Navbar Component
// Author : Alicia Parisse
// Description : 
//    This component is the navigation bar of the dashboard component
//    It is composed of a collapsed version and of a normal version
//    of the items in the navbar.
// Last-comment date : 02/03/16
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
    var NavBar;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            NavBar = (function () {
                function NavBar() {
                    this.loggingOut = new core_1.EventEmitter();
                }
                NavBar.prototype.logout = function () {
                    var cookieManager = new Cookies();
                    cookieManager.remove("oauth_token");
                    cookieManager.remove("coursesData");
                    this.loggingOut.emit(true);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], NavBar.prototype, "loggingOut", void 0);
                NavBar = __decorate([
                    core_1.Component({
                        selector: "navbar",
                        template: "\n\t<nav class=\"navbar navbar-default\">\n\t  <div class=\"container-fluid\">\n\t\t<!-- Brand and toggle get grouped for better mobile display -->\n\t\t<div class=\"navbar-header\">\n\t\t  <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n\t\t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t<span class=\"icon-bar\"></span>\n\t\t  </button>\n\t\t</div>\n\n\t\t<div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n\t\t\t<ul class=\"nav navbar-nav\">\n\t\t\t\t<li class=\"active\"><a href=\"#\">Courses<span class=\"sr-only\">(current)</span></a></li>\n\t\t\t</ul>\n\t\t\t<ul class=\"nav navbar-nav navbar-right\">\n\t\t\t\t<li><a href=# (click)=\"logout()\">Logout</a></li>\n\t\t\t\t\n\t\t  \t</ul>\n\n\t\t</div>\n\t  </div>\n\t</nav>\n\t"
                    }), 
                    __metadata('design:paramtypes', [])
                ], NavBar);
                return NavBar;
            })();
            exports_1("NavBar", NavBar);
        }
    }
});
//# sourceMappingURL=navbar.js.map