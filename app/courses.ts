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
		getAllStudentCourses(true,(coursesRev) => {
			colors = getColors(coursesRev.length);
			for (var i=0; i < coursesRev.length; i++) {
				coursesRev[i].color = colors[i];
			}
			this.courses = coursesRev;
		});
			
		
	}


}