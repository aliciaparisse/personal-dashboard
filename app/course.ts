import {Component,Input} from 'angular2/core';
import {courseCompDiagram} from "../js/coursesTreatment.js";
import {refactorExercises} from "../js/courseMng.js";

@Component({
	selector: 'course',
	template: `
	<div class="course">
		<h2>{{aCourse.name}}</h2>
		<div class='diag-container row'> 
			<div class='diagram col-xs-12 col-sm-4 col-md-4 col-lg-4' id="Completion{{aCourse.name}}"></div>
			<div class="col-xs-12 col-sm-4 col-md-4 col-lg-8 parent">
 				<div title="{{exo.newName}}" class="days activity" *ngFor="#exo of exercises"></div>
 				</div>
		</div>
	</div>`
})

export class Course{
	@Input() aCourse;

	ngAfterViewInit(){
		setTimeout(() => {
		 	courseCompDiagram(this.aCourse);
			this.exercises = this.aCourse.exercises;
			//console.log(this.exercises)

		}, 1);

	}
	
}

//To re-add : 

// <div class="col-xs-12 col-sm-6 col-md-6 col-lg-8 parent" *ngFor="#exo of exercises">
// 				<div class="days activity">
// 			</div>