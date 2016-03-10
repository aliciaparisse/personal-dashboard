// Courses Component
// Author : Alicia Parisse
// Description : 
//		This component is a component that's mainly composed of a list of courses
//		The only directive is a course, repeated as many times as there are courses in the list  
// Last-comment date : 03/03/16

import {Component} from "angular2/core";
import {getAllStudentCourses} from "libs/studentInfoTreatment.js";
import {Course} from './course';
import {getColors} from "libs/tools.js";

@Component({
	selector:"courses",
	directives: [Course],
	template:`
	<div *ngIf = "!noCourses"> 
		<div *ngFor="#aCourse of courses">
			<course 
			[aCourse]="aCourse"></course>
		</div>	
	</div>
	<div [hidden] = "!noCourses">
		You currently have no courses you registered in.<br>
		In order to see information displayed here, please register to at least one course.
	</div>`
})

export class Courses{
	constructor(){
		this.noCourses = true;
		//This gets courses from the API and stores it in this.courses
		getAllStudentCourses(true,(coursesRev) => {
			colors = getColors(coursesRev.length);
			for (var i=0; i < coursesRev.length; i++) {
				coursesRev[i].color = colors[i];
			}
			this.courses = coursesRev;
			if (this.courses == undefined || this.courses.length == 0){
				this.noCourses = true;
			}
			else{
				this.noCourses = false;
			}
		});
		
				
	}
}