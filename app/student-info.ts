import {Component} from "angular2/core";
import {allStudentCourses} from "../js/coursesTreatment.js";
import {DonutDiagram} from "./donut-diagram";

@Component({
	selector:"student-info",
	directives: [DonutDiagram],
	template:`
	<div> <h1>{{name}}</h1>
		<donut-diagram></donut-diagram>
	</div>`
})

export class StudentInfo{
	ngOnInit(){
		this.name="John";
	}

}