import {Component} from "angular2/core";
import {getSampleCourses} from "../js/courseMng.js";
import {Course} from './course';

@Component({
	selector:"courses",
	directives: [Course],
	template:`
	<div> 
		<div *ngFor="#aCourse of courses">
			<course 
			[aCourse]="aCourse"></course>
		</div>	
	</div>`
})

export class Courses{
	constructor(){
		this.courses = getSampleCourses();
	}


}