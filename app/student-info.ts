// Student Information Component
// Author : Alicia Parisse
// Description : 
//		This component is the a component that is meant to stay visible 
//		all the time, and give general information about the student.
// Last-comment date : 03/03/16

import {Component,Input} from "angular2/core";
import {getAllStudentCourses} from "../js/studentInfoTreatment.js";

@Component({
	selector:"student-info",
	template:`
	<div> <h1>Welcome to your personal dashboard, {{studentName}}!</h1>
		<div class='diag-container'> 
			<div id="donutCoursesTaken"></div>
		</div>
	</div>`
})

export class StudentInfo{
	@Input() studentName;

	constructor(){
		getAllStudentCourses(false);
	}
}