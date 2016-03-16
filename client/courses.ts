// Courses Component
// Author : Alicia Parisse
// Description : 
//		This component is a component that's mainly composed of a list of courses
//		The only directive is a course, repeated as many times as there are courses in the list  
// Last-comment date : 03/03/16

/// <reference path="libs/studentInfoTreatment.d.ts"/>
/// <reference path="libs/tools.d.ts"/>

import {Component} from "angular2/core";
import {Course} from './course';


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
	noCourses;
	colors;
	courses;

	constructor(){
		var self = this;
		self.noCourses = true;
		//This gets courses from the API and stores it in this.courses
		StudentInfoTreatment.getAllStudentCourses(true,(coursesRev) => {
			self.colors = Tools.getColors(coursesRev.length);
			for (var i=0; i < coursesRev.length; i++) {
				coursesRev[i].color = self.colors[i];
			}
			self.courses = coursesRev;
			if (self.courses == undefined || self.courses.length == 0){
				self.noCourses = true;
			}
			else{
				self.noCourses = false;
			}
		});
		
				
	}
}