import {Component,Input} from "angular2/core";
import {getSampleCourses} from "../js/courseMng.js";

@Component({
	selector:"exercises",
	template:`
	<div *ngFor="#week of weeks">
		Week {{week.weekNb}}  <div class="days activity" *ngFor="#exo of week.exercises"></div>
	</div>
		
 	`
})

export class Exercises{
	@Input() weeks;

	ngOnChanges(changeRecord){
		console.log(weeks);
	}
}
