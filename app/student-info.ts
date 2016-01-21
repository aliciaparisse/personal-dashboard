import {Component} from "angular2/core";
import {donutCourses, addTotalPercentage} from "../js/highDonut.js";

@Component({
	selector:"student-info",
	template:`
	<div> {{name}}
		<div id="donutCoursesTaken" style="height: 400px"></div>
	</div>`
})

export class StudentInfo{
	constructor(){
		this.name="John";
		donutCourses();
	}

}