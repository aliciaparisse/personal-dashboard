import {Component,Input} from 'angular2/core';
import {donutMaths} from "../js/highDonut.js";

@Component({
	selector: 'course',
	template: `
	<div class="course">
		<h2>{{aCourse.name}}</h2>
		<div class='diag-container'> 
			<div class='diagram' id="donut{{aCourse.name}}"></div>
		</div>
	</div>`
})

export class Course{
	@Input() aCourse;

	constructor(){
		console.log("Yes");
		donutMaths();
	}
}