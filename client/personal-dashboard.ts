// Personal Dashboard Component
// Author : Alicia Parisse
// Description : 
//  	This component is the principal component of the dashboard website
// 		It is composed by a login component (only shown when user not connected),
//		a general student information component and a courses component,
//		containing all the user's courses.
// Last-comment date : 02/03/16

/// <reference path="libs/personalDashboardModule.d.ts"/>

import {Component} from "angular2/core";
import {Courses} from "./courses";
import {StudentInfo} from "./student-info";
import {NavBar} from "./navbar";
import {Login} from "./login";

@Component({
	selector:"personal-dashboard",
	directives:[Courses,StudentInfo, NavBar, Login],
	template:`
	<login *ngIf= "!loggedIn" (logSuccess) ="logSuccess($event)"></login>
	<navbar [hidden]= "!loggedIn" (loggingOut) ="unlogSuccess($event)"></navbar>
	<div *ngIf= "loggedIn" class="row">
		<student-info [studentName]="studentName" class=" col-xs-12 col-sm-5 col-md-3 col-lg-4"></student-info>
		<courses class="col-xs-12 col-sm-7 col-md-9 col-lg-8"></courses>
	</div>`
})

export class PersonalDashboard{
	loggedIn;
	studentName ="";

	constructor(){
		var self = this,
			cookieManager = new PersonalDashboardModule.Cookies();
		//We check if a cookie with the authentication token is defined
		//Setting the loggedIn boolean will automatically change the display
		if(cookieManager.read("oauth_token") != undefined){
			self.loggedIn = true;
			self.studentName = JSON.parse(cookieManager.read("oauth_token")).username;
		}
		else{
			self.loggedIn = false;
		}
	}

	//Function that is called as an output event from the login component,
	//when the logging was a success
	logSuccess(event) {
		this.studentName = event.username;
		this.loggedIn = true;
	}

	unlogSuccess(event){
		this.loggedIn = false;
	}
}

