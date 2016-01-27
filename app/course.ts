import {Component,Input} from 'angular2/core';
import {donutFromCourseCompletion} from "../js/coursesTreatment.js";

@Component({
	selector: 'course',
	template: `
	<div class="course">
		<h2>{{aCourse.name}}</h2>
		<div class='diag-container'> 
			<div class='diagram' id="Completion{{aCourse.name}}">I am a course of {{aCourse.name}}</div>
		</div>
	</div>`
})

export class Course{
	@Input() aCourse;

	ngOnInit(){
		donutFromCourseCompletion(this.aCourse.name);
	}
}