import {Component} from "angular2/core";

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
          	<li><a href="#">Activity</a></li>
          	<li><a href="#">Goals</a></li>
          </ul>
        </div>
      </div>
    </nav>
	`
})

export class NavBar{

}
