import {Component} from "angular2/core";
import {allStudentCourses} from "../js/coursesTreatment.js";

@Component({
	selector:"donut-diagram",
	template:`
		<div class='diag-container'> 
			<div id="donutCoursesTaken"></div>
		</div>`
})

export class DonutDiagram{
	constructor(){
		allStudentCourses();
	}
}
