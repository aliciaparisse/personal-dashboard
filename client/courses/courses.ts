// Courses Component
// Author : Alicia Parisse
// Description : 
//		This component is a component that's mainly composed of a list of courses
//		The only directive is a course, repeated as many times as there are courses in the list  
// Last-comment date : 03/03/16


/// <reference path="../libs/jquery/jquery.d.ts"/>

import {Component, Input} from "angular2/core";
import {Course} from './course';
import {Tools} from "./../global/tools";
import {StudentInfoTreatment} from "./../student-info/student-info-treatment";



@Component({
	selector:"courses",
	directives: [Course],
	template:`
	<div *ngIf = "!noCourses"> 
		<div *ngFor="#aCourse of courses">
			<course 
			[aCourse]="aCourse"
			(deletingCourse)= "hideCourse($event)"></course>
		</div>	
	</div>
	<div [hidden] = "!noCourses">
		You currently have no courses you registered in.<br>
		In order to see information displayed here, please register to at least one course.
	</div>
	<button class="btn btn-default add-course" (click)="addACourse()">Add a course</button>
	`
})

export class Courses{
	noCourses;
	colors;
	courses;
	hiddenCourses = [];
	@Input() user_id;

	constructor(){
		var self = this;
		self.noCourses = true;
		//This gets courses from the API and stores it in this.courses
		StudentInfoTreatment.getAllStudentCourses(true,(coursesRev) => {
			//Before assigning the colors to the course, we first check the courses that are hidden
			(<any>$).ajax({
				url: 'http://localhost:3000/mongo/hiddenCourses',
				method: "get",
				success : function(hiddenCourses){
					for(var i = 0; i < hiddenCourses.length; i++){
						self.addHiddenCourseById(self.courses, hiddenCourses[i].course_id);
					}
					console.log(self.hiddenCourses);

				}
			});


			self.colors = Tools.getColors(coursesRev.length);
			for (var i=0; i < coursesRev.length; i++) {
				coursesRev[i].color = self.colors[i];
			}
			self.courses = coursesRev;
			if (self.courses == undefined || self.courses.length == 0){
				self.noCourses = true;
			}
			else{
				self.noCourses = false;
			}
		});

	}

	hideCourse(event){
		var self = this;
		var body = {"user_id" : self.user_id,"course_id": event.id, "hidden":true};
		console.log(JSON.stringify(body));
		(<any>$).ajax({
			url: 'http://localhost:3000/mongo/addHiddenCourse',
			method: "put",
			contentType: "application/json",
			data: JSON.stringify(body)
		});
		self.addHiddenCourseById(self.courses, event.id);
		console.log(self.courses);
		if(this.courses.length == 0){
			self.noCourses = true;
		}
	}

	addCourse(){

	}

	addHiddenCourseById(array, id){
		var i,
			self=this;
		for (i =0; i< array.length; i++){
			if(array[i].id == id){
				break;
			}
		}
		self.hiddenCourses.push(array[i]);
		array.splice(i,1);
	}


}