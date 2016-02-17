import {Component} from "angular2/core";
import {getSampleCourses} from "../js/courseMng.js";
import {Course} from './course';
import {getCookie} from "../js/tools.js";

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
		if(getCookie("coursesData") != undefined){
			//console.log(JSON.parse(getCookie("coursesData")));
			//this.courses = getCookie("coursesData");
			this.courses = getSampleCourses();
		}
		
	}


}