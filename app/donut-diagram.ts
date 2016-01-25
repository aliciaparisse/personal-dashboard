import {Component} from "angular2/core";
import {donutCourses} from "../js/highDonut.js";

@Component({
	selector:"donut-diagram",
	template:`
		<div class='diag-container'> 
			<div class='diagram' id="donutCoursesTaken"></div>
		</div>`
})

export class DonutDiagram{
	constructor(){
		donutCourses();
	}
}
