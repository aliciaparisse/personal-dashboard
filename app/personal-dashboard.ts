import {Component} from "angular2/core";
import {Courses} from "./courses";
import {StudentInfo} from "./student-info";
import {NavBar} from "./navbar";
import {ExerciseActivity} from "./exercise-activity";

@Component({
	selector:"personal-dashboard",
	directives:[Courses,StudentInfo,ExerciseActivity, NavBar],
	template:`
	<navbar></navbar>
	<div class="row">
		<student-info class=" col-xs-12 col-sm-5 col-md-3 col-lg-4"></student-info>
		<courses class="col-xs-12 col-sm-7 col-md-9 col-lg-8"></courses>
	</div>`
})

export class PersonalDashboard{
}

