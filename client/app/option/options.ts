// Options Component
// Author : Alicia Parisse
// Description :
//		This component is representing the options that the user have.
//		It's composed of only one thing for now :
//			- a list of all the courses archived by the user, or a message saying he didn't archive any.
//      This file is meant to contain more options. For example archived activities or goals.
// Last-comment date : 30/05/16

/// <reference path="../../libs/jquery/jquery.d.ts"/>
/// <reference path="../../libs/js-cookie.d.ts"/>

import {Tools} from "../../app/global/tools";
import {Component} from 'angular2/core';
import {StudentInfoTreatment} from '../student-info/student-info-treatment';

@Component({
    selector:'options',
    template:`<h2>Archived courses</h2>
    <div *ngIf="!noArchivedCourses && !loading">
        <form id="unarchiveForm" (submit)="unarchive()">
            <div *ngFor="#course of archivedCourses" class="archived-course-title">
                <input type="checkbox" name="{{course.name}}" id="arcCourse{{course.id}}">	&nbsp; {{course.title}}
            </div>
            <br/>
            <button class="btn btn-lg btn-primary" type="submit">Unarchive selected courses</button>
        </form>
    </div>
    <div *ngIf="noArchivedCourses && !loading">
        You currently have no archived courses.
    </div>
    <div *ngIf="loading" class="loading-message">
        Currently loading the courses information...
    </div>
    `
})

export class Options{
    noArchivedCourses:boolean;
    archivedCourses = [];
    loading:boolean;

    constructor(){
        var self = this,
            userId = JSON.parse(Cookies.get("oauth_token")).username;
        self.loading = true;
        var url_base = window.location.origin;
        //First we get the list of ids of archived courses
        (<any>$).ajax({
            url: url_base + '/mongo/archivedCourses',
            method: "get",
            data: {userId : userId},
            success : function(recArchivedCourses){
                //If it worked, we get the global information of the courses
                StudentInfoTreatment.getAllStudentCourses(true,(courses) => {

                    if (!self.isEmpty(recArchivedCourses[0])) {
                        //From the moment where we know that the recArchivedCourses is not empty
                        //We can now merge the ids and the names of the courses to display them.
                        for (var i = 0; i < courses.length; i++) {
                            for (var j = 0; j < recArchivedCourses.length; j++) {
                                if (courses[i].id == recArchivedCourses[j].course_id) {
                                    self.archivedCourses.push(courses[i]);


                                }
                            }
                        }

                        self.loading = false;
                        self.noArchivedCourses = false;

                    }
                    //If the archivedCourses object is empty, we set noArchivedCourses to true.
                    else{
                        self.loading=false;
                        self.noArchivedCourses = true;
                    }
                });
            }
        });
    }

    //The goal of this function is to unarchive a course
    //in other words to say that we want the course to be displayed in the courses tab and to disappear from here.
    unarchive(){
        var self = this,
            delIndexes = [],
            userId = JSON.parse(Cookies.get("oauth_token")).username,
            unarchivedCourses = [],
            url_base = window.location.origin;

        //As you can unarchive multiple courses at a time, we check which course is checked, by going through them.
        for(var i =0; i<self.archivedCourses.length; i++){
            var courseId = self.archivedCourses[i].id;
            if ((<any>$)('#arcCourse'+self.archivedCourses[i].id).is(':checked')){
                delIndexes.push(i);
                unarchivedCourses.push({"user_id" : userId,"course_id": courseId});
            }
        }
        for (var i = 0; i < delIndexes.length; i++){

            self.archivedCourses.splice(delIndexes[i],1);
        }
        //We check if we suppressed the last archived course.
        if(self.archivedCourses.length == 0){
            //If we did, we display the message corresponding to the fact that there are no archived courses anymore.
            self.noArchivedCourses = true;
        }

        //We send to the mongoDB the list of courses that we want to unarchive
        for (var i =0; i < unarchivedCourses.length ; i++){
            //For each course that is supposed to be unarchived, we launch this ajax call.
            (<any>$).ajax({
                url: url_base + '/mongo/removeArchivedCourse',
                method: "put",
                contentType: "application/json",
                data: JSON.stringify(unarchivedCourses[i])
            });
        };
    }

    //The goal of this function is to say whether an object is empty or not.
    isEmpty(obj) {
        for (var x in obj) { return false; }
        return true;
    }


}