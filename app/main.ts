import {Component} from "angular2/core";
import createChart from "../js/highTest.js";

@Component({
	selector:"app",
	template:`<form (submit)="onSubmit(myInput.value)">
	<input type="text" #myInput>
	<div id="container" style="height: 400px">Hey</div>`
})

export class App{
	ngOnInit(){
		console.log(createChart());
	}

	onSubmit(title){
		createChart(title);
	}

}