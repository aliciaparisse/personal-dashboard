import {Component} from "angular2/core";
import {Courses} from "./courses";
import {StudentInfo} from "./student-info";

@Component({
	selector:"personal-dashboard",
	directives:[Courses,StudentInfo],
	template:`
	<div class="row">
		<student-info class="student-info col-xs-12 col-sm-6 col-md-5 col-lg-4"></student-info>
		<courses class="col-xs-12 col-sm-6 col-md-7 col-lg-8"></courses>
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
