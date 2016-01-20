import {Component} from "angular2/core";
import {createChart} from "../js/highTest.js";

//declare function createChart():string;

@Component({
	selector:"app",
	template:`<div id="container" style="height: 400px">Hey</div>`
})

export class App{
	ngOnInit(){
		//console.log(typeof createChart);
	}

}