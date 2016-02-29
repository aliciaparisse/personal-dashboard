import {Component,Input, ChangeDetectorRef} from 'angular2/core';
import {courseCompDiagram, sepExInWeeks} from "../js/coursesTreatment.js";
import {Exercises} from "./exercises";


@Component({
	selector: 'course',
	directives:[Exercises],
	template: `
	<div class="course">
		<h2>{{aCourse.title}}</h2>
		<div class='diag-container row'> 
			<div class='col-xs-12 col-sm-12 col-md-3 col-lg-3 diagram' id="Completion{{aCourse.name}}">
			</div>
				
			
			<div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 parent" *ngFor="#week of weeks">
	
				Week {{week.weekNb}} <div title="{{exo.newName}}" class="exerc activity {{exo.state}}" *ngFor="#exo of week.exercises"></div>
		
 			</div>
		</div>
	</div>`
})

export class Course{
	@Input() aCourse;

	constructor(cdr: ChangeDetectorRef) {
	    this.cdr = cdr;
	  }

	ngAfterViewInit(){
		
		this.weeks = sepExInWeeks(courseCompDiagram(this.aCourse).exercises);
		this.cdr.detectChanges();	
	}
	
	
}

//To re-add : <div title="{{exo.newName}}" class="exerc activity" *ngFor="#exo of week.exercises"></div>

//<div class='diagram col-xs-12 col-sm-4 col-md-4 col-lg-4' id="Completion{{aCourse.name}}"></div>
	 

//<div class="col-xs-12 col-sm-6 col-md-6 col-lg-8 parent" *ngFor="#exo of exercises">
// 				<div class="days activity">
// // 			</div>
// <div title="{{exo.newName}}" class="days activity" *ngFor="#exo of exercises"></div>
//  				