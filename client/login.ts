// Login Component
// Author : Alicia Parisse
// Description : 
//		This component is used for a user to log in
//		It's composed by an empty nav bar and a log in form
// Last-comment date : 02/03/16

/// <reference path="libs/personalDashboardModule.d.ts"/>
/// <reference path="libs/js-cookie.d.ts"/>
// / <reference path="libs/jquery/jquery.d.ts"/>


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
		var self = this;
		this.loading = true;
		//Here we use the authentication information and we use them to ask the oauth end for a token
		PersonalDashboardModule.Tools.login(username,password,
			(tokenReceived) => {
				tokenReceived.username = username;
				Cookies.set("oauth_token", JSON.stringify(tokenReceived));
				self.logSuccess.emit(tokenReceived);
				var form : HTMLFormElement;
				form = <HTMLFormElement> document.getElementById("loginForm");
				form.reset();
				self.loading = false;

			},
			(response) => {
				self.logError =true;
				var form : HTMLFormElement;
				form = <HTMLFormElement> document.getElementById("loginForm");
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
		)

	}
}
