import {Component} from "angular2/core";
import {getAllStudentCourses} from "../js/studentInfoTreatment.js";

@Component({
	selector:"donut-diagram",
	template:`
		<div class='diag-container'> 
			<div id="donutCoursesTaken"></div>
		</div>`
})

export class DonutDiagram{
	constructor(){
		getAllStudentCourses();
	}
}
