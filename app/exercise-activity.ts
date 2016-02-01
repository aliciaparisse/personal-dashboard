import {Component,Input} from "angular2/core";

@Component({
	selector:"exercise-activity",
	template:`
	In progress..	
	`
})

export class ExerciseActivity{

	@Input() exo;

}

// <div class="days activity">{{exo.newName}}</div>