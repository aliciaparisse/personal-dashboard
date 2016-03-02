import {Component,Input, ChangeDetectorRef} from 'angular2/core';
import {courseCompDiagram, sepExInWeeks} from "../js/coursesTreatment.js";
import {getCorrColors, changeExercColor} from "../js/tools.js";


@Component({
	selector: 'course',
	template: `
	<div class="course {{aCourse.name}}">
		<h2>{{aCourse.title}}</h2>
		<div class='diag-container row'> 
			<div class='col-xs-12 col-sm-12 col-md-3 col-lg-3 diagram' id="Completion{{aCourse.name}}">
			</div>
				
			
			<div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 parent" *ngFor="#week of weeks">
	
				Week {{week.weekNb}} 
				<div title="{{exo.newName}}" class="exerc {{exo.state}}" id="{{exo.exercise_id}}" *ngFor="#exo of week.exercises"></div> 
		
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
		this.colors =  getCorrColors(this.aCourse.color);
		this.weeks = sepExInWeeks(courseCompDiagram(this.aCourse, this.colors).exercises);
		this.cdr.detectChanges();
		changeExercColor(this.aCourse.name, this.colors);
	}
	
	
}

