// Courses Component
// Author : Alicia Parisse
// Description : 
//		This component is a component that's mainly composed of a list of courses
//		The only directive is a course, repeated as many times as there are courses in the list  
// Last-comment date : 03/03/16


/// <reference path="../../libs/jquery/jquery.d.ts"/>
/// <reference path="../../libs/js-cookie.d.ts"/>

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
			(deletingCourse)= "archiveCourse($event)"></course>
		</div>
	</div>
	<div [hidden] = "!noCourses">
		You currently have no courses you registered in, or that are not archived.<br/>
		In order to see information displayed here, please register to at least one course, or unarchive at least one course.<br/>
		To unarchive a course, go to the Options Tab and select the course to unarchive.
	</div>
	`
})

export class Courses{
	noCourses;
	colors;
	courses;
	archivedCourses = [];
	user_id;

	constructor(){
		var self = this;
		self.noCourses = true;
		self.user_id = JSON.parse(Cookies.get("oauth_token")).username;
		var url_base = window.location.origin;
		console.log(self.user_id);
		//This gets courses from the API and stores it in this.courses
		StudentInfoTreatment.getAllStudentCourses(true,(coursesRev) => {
			//Before assigning the colors to the course, we first check the courses that are hidden
			(<any>$).ajax({
				url: url_base + '/mongo/archivedCourses',
				method: "get",
				data: {userId : self.user_id},
				success : function(archivedCourses){

					self.colors = Tools.getColors(coursesRev.length);
					for (var i=0; i < coursesRev.length; i++) {
						coursesRev[i].color = self.colors[i];
					}

					self.courses = coursesRev;
					for(var i = 0; i < archivedCourses.length; i++){
						self.addArchivedCourseById(self.courses, archivedCourses[i].course_id);
					}

					if (self.courses == undefined || self.courses.length == 0){
						self.noCourses = true;
					}
					else{
						self.noCourses = false;
					}

				}
			});



		});

	}

	archiveCourse(event){
		var self = this,
			body = {"user_id" : self.user_id,"course_id": event.id},
			url_base = window.location.origin;
		(<any>$).ajax({
			url: url_base + '/mongo/addArchivedCourse',
			method: "put",
			contentType: "application/json",
			data: JSON.stringify(body)
		});
		self.addArchivedCourseById(self.courses, event.id);
		if(this.courses.length == 0){
			self.noCourses = true;
		}
	}

	addArchivedCourseById(array, id){
		var i,
			self=this;
		for (i =0; i< array.length; i++){
			if(array[i].id == id){
				break;
			}
		}
		self.archivedCourses.push(array[i]);
		array.splice(i,1);
	}


}