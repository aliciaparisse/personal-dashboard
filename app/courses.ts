import {Component} from "angular2/core";
import getAllCourses from "../js/courseMng.js"
import {Course} from './course';

@Component({
	selector:"courses",
	directives: [Course],
	template:`
	<div> I'm a course list
		<div *ngFor="#aCourse of courses">
			<course
			[aCourse]="aCourse"></course>
		</div>	
	</div>`
})

export class Courses{
	constructor(){
		this.courses = getAllCourses();
		console.log(this.courses);
	}


}