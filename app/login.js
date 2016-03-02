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
    var Login;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            Login = (function () {
                function Login() {
                    this.logSuccess = new core_1.EventEmitter();
                }
                Login.prototype.onSubmit = function (username, password) {
                    var self = this;
                    //Here we use the authentication information and we use them to ask the oauth end for a token 
                    $.ajax({
                        url: 'https://hy-canary.testmycode.io/oauth/token',
                        method: "post",
                        data: {
                            client_id: "228e3c5cfc33605da6919b536b51a4d3b4a84ac06aa6f5db64d0964f66535f20",
                            client_secret: "8136718b825475cb108f2c47889a0e85fcbf6866b4206a606fe2f81af21aea90",
                            grant_type: 'password',
                            username: username,
                            password: password },
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        // Now we can store the token in a cookie
                        success: function (tokenReceived) {
                            setCookie("oauth_token", JSON.stringify(tokenReceived));
                            self.logSuccess.emit(tokenReceived);
                        }
                    });
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], Login.prototype, "logSuccess", void 0);
                Login = __decorate([
                    core_1.Component({
                        selector: "login",
                        template: "\n        <nav class=\"navbar navbar-default\">\n        </nav>\n\t\t<form class=\"form-signin\" (submit)=\"onSubmit(userN.value, passW.value)\">\n        <h2 class=\"form-signin-heading\">Please log in to HY</h2>\n        <label for=\"inputUsername\" class=\"sr-only\">Username</label>\n        <input #userN type=\"text\" id=\"inputUsername\" class=\"form-control\" placeholder=\"Username\" required autofocus>\n        <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n        <input #passW type=\"password\" id=\"inputPassword\" class=\"form-control\" placeholder=\"Password\" required>\n        <div class=\"checkbox\">\n          <label>\n            <input type=\"checkbox\" value=\"remember-me\"> Remember me\n          </label>\n        </div>\n        <button class=\"btn btn-lg btn-primary btn-block\" type=\"submit\">Sign in</button>\n      </form>\n\t"
                    }), 
                    __metadata('design:paramtypes', [])
                ], Login);
                return Login;
            })();
            exports_1("Login", Login);
        }
    }
});
//# sourceMappingURL=login.js.map