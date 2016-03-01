import {Component,Output, EventEmitter} from "angular2/core";

@Component({
	selector:"login",
	template:`
        <nav class="navbar navbar-default">
        </nav>
		<form class="form-signin" (submit)="onSubmit(userN.value, passW.value)">
        <h2 class="form-signin-heading">Please log in to HY</h2>
        <label for="inputUsername" class="sr-only">Username</label>
        <input #userN type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input #passW type="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
	`
})

export class Login{
    @Output() logSuccess = new EventEmitter();

	onSubmit(username, password){
        var self = this;
        //Here we use the authentication information and we use them to ask the oauth end for a token 
        $.ajax({
            url: 'https://hy-canary.testmycode.io/oauth/token',
            method: "post",
            data: {
                client_id:"228e3c5cfc33605da6919b536b51a4d3b4a84ac06aa6f5db64d0964f66535f20",
                client_secret:"8136718b825475cb108f2c47889a0e85fcbf6866b4206a606fe2f81af21aea90",
                grant_type : 'password',
                username : username,
                password : password},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        
            // Now we can store the token in a cookie
            success: function (tokenReceived){
                setCookie("oauth_token", JSON.stringify(tokenReceived));
                self.logSuccess.emit(tokenReceived);
            }
        }); 
	}
}
