import {Component} from "angular2/core";
import {Courses} from "./courses";
import {StudentInfo} from "./student-info";

@Component({
	selector:"personal-dashboard",
	directives:[Courses,StudentInfo],
	template:`
	<div class="row">
		<student-info class="student-info col-xs-4 col-sm-4 col-md-3 col-lg-3"></student-info>
		<courses class="col-xs-6 col-sm-6 col-md-9 col-lg-9"></courses>
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
