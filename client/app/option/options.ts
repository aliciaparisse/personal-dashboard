/**
 * Created by parisse on 31.3.2016.
 */

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
    <div *ngIf="loading">
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
        (<any>$).ajax({
            url: url_base + '/mongo/archivedCourses',
            method: "get",
            data: {userId : userId},
            success : function(recArchivedCourses){
                StudentInfoTreatment.getAllStudentCourses(true,(courses) => {

                    if (!self.isEmpty(recArchivedCourses[0])) {
                        //From the moment where we know that the recArchivedCourses is not empty

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
                    else{
                        self.loading=false;
                        self.noArchivedCourses = true;
                    }
                });
            }
        });
    }

    unarchive(){
        var self = this,
            delIndexes = [],
            userId = JSON.parse(Cookies.get("oauth_token")).username,
            unarchivedCourses = [],
            url_base = window.location.origin;;
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

        if(self.archivedCourses.length == 0){
            self.noArchivedCourses = true;
        }

        for (var i =0; i < unarchivedCourses.length ; i++){

            (<any>$).ajax({
                url: url_base + '/mongo/removeArchivedCourse',
                method: "put",
                contentType: "application/json",
                data: JSON.stringify(unarchivedCourses[i])
            });
        };
    }

    isEmpty(obj) {
        for (var x in obj) { return false; }
        return true;
    }


}