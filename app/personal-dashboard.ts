import {Component} from "angular2/core";
import {Course} from "./course";
import {StudentInfo} from "./student-info";

@Component({
	selector:"personal-dashboard",
	directives:[Course,StudentInfo],
	template:`
	<div>
		<student-info></student-info>
		<course></course>
	</div>`
})

export class PersonalDashboard{

}

//REUSABLE CODE
// template:`<form (submit)="onSubmit(myInput.value)">
// 	<input type="text" #myInput>
// 	<div id="container" style="height: 400px">Hey</div>`
// })

// export class PersonalDashboard{
// 	ngOnInit(){
// 		console.log(createChart());
// 	}

// 	onSubmit(title){
// 		modifyChart(title);
// 	}

// }
