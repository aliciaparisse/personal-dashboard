import {Component,Input} from 'angular2/core';
import {donutFromCourseCompletion} from "../js/coursesTreatment.js";

@Component({
	selector: 'course',
	template: `
	<div class="course">
		<h2>{{aCourse.name}}</h2>
		<div class='diag-container row'> 
			<div class='diagram col-xs-12 col-sm-6 col-md-6 col-lg-4' id="Completion{{aCourse.name}}">I am a course of {{aCourse.name}}</div>
			
		</div>
	</div>`
})

export class Course{
	@Input() aCourse;

	ngAfterViewInit(){
		donutFromCourseCompletion(this.aCourse);
		this.exercises = this.aCourse.exercises;
	}
	
}

//To re-add : 

// <div class="col-xs-12 col-sm-6 col-md-6 col-lg-8 parent" *ngFor="#exo of exercises">
// 				<div class="days activity">
// 			</div>