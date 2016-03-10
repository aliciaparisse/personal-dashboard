// Navbar Component
// Author : Alicia Parisse
// Description : 
//    This component is the navigation bar of the dashboard component
//    It is composed of a collapsed version and of a normal version
//    of the items in the navbar.
// Last-comment date : 02/03/16

import {Component, Output, EventEmitter} from "angular2/core";

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
				<li class="active"><a href="#">Courses<span class="sr-only">(current)</span></a></li>
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

	logout(){
		var cookieManager = new Cookies();
		cookieManager.remove("oauth_token");
		cookieManager.remove("coursesData");
		this.loggingOut.emit(true);
	}

}
