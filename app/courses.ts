// Courses Component
// Author : Alicia Parisse
// Description : 
//		This component is a component that's mainly composed of a list of courses
//		The only directive is a course, repeated as many times as there are courses in the list  
// Last-comment date : 03/03/16

import {Component} from "angular2/core";
import {getAllStudentCourses} from "../js/studentInfoTreatment.js";
import {Course} from './course';
import {getCookie, getColors} from "../js/tools.js";

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
		//This gets courses from the API and stores it in this.courses
		getAllStudentCourses(true,(coursesRev) => {
			colors = getColors(coursesRev.length);
			for (var i=0; i < coursesRev.length; i++) {
				coursesRev[i].color = colors[i];
			}
			this.courses = coursesRev;
		});
			
		
	}


}