import {Component,Input, ChangeDetectorRef} from 'angular2/core';
import {courseCompDiagram, sepExInWeeks} from "../js/coursesTreatment.js";
import {Exercises} from "./exercises";
import {getCorrColors, changeExercColor} from "../js/tools.js";


@Component({
	selector: 'course',
	directives:[Exercises],
	template: `
	<div class="course {{aCourse.name}}">
		<h2>{{aCourse.title}} {{aCourse.color}}</h2>
		<div class='diag-container row'> 
			<div class='col-xs-12 col-sm-12 col-md-3 col-lg-3 diagram' id="Completion{{aCourse.name}}">
			</div>
				
			
			<div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 parent" *ngFor="#week of weeks">
	
				Week {{week.weekNb}} 
				<div title="{{exo.newName}}" class="exerc activity {{exo.state}}" id="{{exo.exercise_id}}" *ngFor="#exo of week.exercises"></div> 
		
 			</div>
		</div>
	</div>
	<style>
		.activity.completed { {{background: #D0EDF1}}; }
		.activity.begun { background: #FFBE5A; }
		.activity.todo { background: #D3D3D3; }
	</style>`
})

export class Course{
	@Input() aCourse;

	constructor(cdr: ChangeDetectorRef) {
	    this.cdr = cdr;
	  }

	ngAfterViewInit(){
		this.colors =  getCorrColors(this.aCourse.color);
		this.weeks = sepExInWeeks(courseCompDiagram(this.aCourse, this.colors).exercises);
		//changeExercColor(this.aCourse.name);
		this.cdr.detectChanges();
	}
	
	
}

