// Personal Dashboard Component
// Author : Alicia Parisse
// Description : 
//  	This component is the principal component of the dashboard website
// 		It is composed by a login component (only shown when user not connected),
//		a general student information component and a courses component,
//		containing all the user's courses.
// Last-comment date : 02/03/16

/// <reference path="../../libs/js-cookie.d.ts"/>

import {Component} from "angular2/core";
import {Courses} from "../courses/courses";
import {StudentInfo} from "./../student-info/student-info";
import {NavBar} from "./navbar";
import {Login} from "./login";
import {Options} from "../option/options";
import {Activities} from "../activities/activities";

@Component({
	selector:"personal-dashboard",
	directives:[Courses,StudentInfo, NavBar, Login, Activities, Options],
	template:`
	<login *ngIf= "!loggedIn" (logSuccess) ="logSuccess($event)"></login>
	<navbar [hidden]= "!loggedIn" (loggingOut) ="unlogSuccess($event)" (changedTab)="changingTab($event)"></navbar>
	<div *ngIf= "loggedIn" class="row">
		<student-info [studentName]="studentName"
			class=" col-xs-12 col-sm-5 col-md-3 col-lg-4"
			*ngIf="studInfo"></student-info>
		<courses [user_id]="studentName" *ngIf="tabNumber == 0"
		 	class="col-xs-12 col-sm-7 col-md-9 col-lg-8"></courses>
		<!--<activities *ngIf="tabNumber == 1"
			class="col-xs-12 col-sm-7 col-md-9 col-lg-8"></activities>
		-->
		<options *ngIf="tabNumber == 2"
			class="col-xs-12 col-sm-6 col-md-4 col-lg-4"></options>
	</div>`
})

export class PersonalDashboard{
	loggedIn;
	studInfo;
	studentName ="";
	tabNumber:number = 0; //0 is for the default Courses tab

	constructor(){
		var self = this;
		self.studInfo = true;
		//We check if a cookie with the authentication token is defined
		//Setting the loggedIn boolean will automatically change the display
		if(Cookies.get("oauth_token") != undefined){
			self.loggedIn = true;
			self.studentName = JSON.parse(Cookies.get("oauth_token")).username;
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

	changingTab(event){
		if(event == 'courses-tab'){
			this.tabNumber = 0;
			this.studInfo = true;
		}
		else if (event == 'activity-tab'){
			this.tabNumber = 1;
			this.studInfo = true;
		}
		else if (event == 'options-tab'){
			this.tabNumber = 2;
			this.studInfo = false;
		}
	}
}

