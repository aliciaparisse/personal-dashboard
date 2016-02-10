import {Component,Input,NgZone} from 'angular2/core';
import {courseCompDiagram, sepExInWeeks} from "../js/coursesTreatment.js";
import {getSampleWeeks} from "../js/courseMng.js";
import {Exercises} from "./exercises";


@Component({
	selector: 'course',
	directives:[Exercises],
	template: `
	<div class="course">
		<h2>{{aCourse.name}}</h2>
		<div class='diag-container row'> 
			<div class='diagram col-xs-12 col-sm-4 col-md-4 col-lg-4' id="Completion{{aCourse.name}}"></div>
	
			<div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 parent" *ngFor="#week of weeks">
	
				Week {{week.weekNb}}  <div class="exerc activity" *ngFor="#exo of week.exercises"></div>
		
 			</div>
		</div>
	</div>`
})

export class Course{
	@Input() aCourse;

	constructor(private _ngZone: NgZone){}

	ngAfterViewInit(){
		this._ngZone.run(
		 () => {
		 	courseCompDiagram(this.aCourse,(concernedCourse) => {
			//console.log(concernedCourse);
		 	this.weeks = sepExInWeeks(concernedCourse.course.exercises);
			console.log(this.weeks);
			});
		});
		
	}
	
	
}

//To re-add : 

// <div class="col-xs-12 col-sm-6 col-md-6 col-lg-8 parent" *ngFor="#exo of exercises">
// 				<div class="days activity">
// // 			</div>
// <div title="{{exo.newName}}" class="days activity" *ngFor="#exo of exercises"></div>
//  				