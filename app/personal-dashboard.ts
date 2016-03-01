import {Component} from "angular2/core";
import {Courses} from "./courses";
import {StudentInfo} from "./student-info";
import {NavBar} from "./navbar";
import {Login} from "./login";
import {getCookie, setCookie} from "../js/tools.js";

@Component({
	selector:"personal-dashboard",
	directives:[Courses,StudentInfo, NavBar, Login],
	template:`
	<login *ngIf= "!loggedIn" (logSuccess) ="logSuccess($event)"></login>
	<navbar [hidden]= "!loggedIn"></navbar>
	<div *ngIf= "loggedIn" class="row">
		<student-info class=" col-xs-12 col-sm-5 col-md-3 col-lg-4"></student-info>
		<courses class="col-xs-12 col-sm-7 col-md-9 col-lg-8"></courses>
	</div>`
})

export class PersonalDashboard{
	constructor(){
		var self = this;
		if(getCookie("oauth_token") != undefined){
			self.loggedIn = true;
		}
		else{
			self.loggedIn = false;
		}
	}

	logSuccess(event:object){
		console.log("here");
		this.loggedIn = true;
	}
}

