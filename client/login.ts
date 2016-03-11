// Login Component
// Author : Alicia Parisse
// Description : 
//		This component is used for a user to log in
//		It's composed by an empty nav bar and a log in form
// Last-comment date : 02/03/16

/// <reference path="libs/personalDashboardModule.d.ts"/>

import {Component,Output, EventEmitter} from "angular2/core";

@Component({
	selector:"login",
	template:`
		<nav class="navbar navbar-default">
		</nav>
		<form id="loginForm" class="form-signin" (submit)="onSubmit(userN.value, passW.value)">
			<h2 class="form-signin-heading">Please log in to HY</h2>
			<label for="inputUsername" class="sr-only">Username</label>
			<input #userN type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
			<label for="inputPassword" class="sr-only">Password</label>
			<input #passW type="password" id="inputPassword" class="form-control" placeholder="Password" required>
			<span [hidden]="!loading">Loading...</span>
			<span [hidden] = "!logError" class="error-message">{{errorMessage}}</span>
			<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
	  	</form>
	`
})

export class Login{
	@Output() logSuccess = new EventEmitter();
	logError;
	loading;
	logMessages;
	errorMessage;

	constructor(){
		this.logError=false;
		this.loading=false;
		this.logMessages = [
			"There was an error while you were trying to connect to the server, please try again later",
			"The username or password is invalid. Please try again",
			"An unexpected error occured, please try again later"
		]
		this.errorMessage =""
	}
	onSubmit(username, password){
		var self = this,
			cookieManager = new PersonalDashboardModule.Cookies.Cookies();
		this.loading = true;
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
				tokenReceived.username = username;
				cookieManager.write("oauth_token", JSON.stringify(tokenReceived));
				self.logSuccess.emit(tokenReceived);
				var form = document.getElementById("loginForm");
				form.reset();
				self.loading = false;

			},
			error:function(response){
				self.logError =true;
				var form = document.getElementById("loginForm");
				form.reset();
				if (response.status == 404) {
					self.errorMessage = self.logMessages[0];
				}
				else if (response.status == 401){
					self.errorMessage = self.logMessages[1];
				}
				else{
					self.errorMessage = self.logMessages[2];
				}
				self.loading = false;
			}
		}); 
	}
}
