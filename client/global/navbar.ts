// Navbar Component
// Author : Alicia Parisse
// Description : 
//    This component is the navigation bar of the dashboard component
//    It is composed of a collapsed version and of a normal version
//    of the items in the navbar.
// Last-comment date : 02/03/16

/// <reference path="../libs/jquery/jquery.d.ts"/>
/// <reference path="../libs/js-cookie.d.ts"/>

import {Component, Output, EventEmitter} from "angular2/core";
import {runInThisContext} from "vm";

@Component({
	selector:"navbar",
	template:`
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
		  <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			<span class="sr-only">Toggle navigation</span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		  </button>
		</div>

		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li id="courses-tab" class="principal-navbar active"><a href="#" (click)="changingTab('courses-tab')">Courses</a></li><!--
				<li id="activity-tab" class="principal-navbar"><a href="#" (click)="changingTab('activity-tab')">Activity</a></li>-->
				<li id="options-tab" class="principal-navbar"><a href="#" (click)="changingTab('options-tab')">Options</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li><a href=# (click)="logout()">Logout</a></li>
				
		  	</ul>

		</div>
	  </div>
	</nav>
	`
})

export class NavBar{
	@Output() loggingOut = new EventEmitter();
	@Output() changedTab = new EventEmitter();

	logout(){
		Cookies.remove("oauth_token");
		this.loggingOut.emit(true);
	}

	changingTab(tabName){
		var self = this;
		(<any>$("li.principal-navbar")).each(function(index){
			if ((<any>$(this)).attr('id') == tabName){
				(<any>$(this)).addClass("active");
				self.changedTab.emit(tabName);
			}
			else{
				(<any>$(this)).removeClass("active");
			}
		});
	}
}
