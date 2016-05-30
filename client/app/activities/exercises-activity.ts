// Exercise Activity Component
// Author : Alicia Parisse
// Description :
//		This component is representing the exercises activities. E.g. the activity of the students concerning the number of exercises he's done
//		It's composed of two things :
//			- a week exercise activity, showing only last week
//			- a year exercise activity, showing last year and that's zoomable
// Last-comment date : 30/05/16

/// <reference path="../../libs/jquery/jquery.d.ts"/>
/// <reference path="../../libs/js-cookie.d.ts"/>

import {Component, Output, EventEmitter} from "angular2/core";
import {ActivityTreatment} from "./activity-treatment";

@Component({
    selector:'exercises-activity',
    template: `
    <div>
        <div class="activity" id="weekExerciseActivity">
            <span class="loading-message">Please wait while the activities are being loaded...</span>
        </div>
        <div class="activity" id="zoomExerciseActivity"></div>
    </div>`
})

export class ExercisesActivity{
    user_id;

    constructor() {
        var self = this;
        self.user_id = JSON.parse(Cookies.get("oauth_token")).username;
        ActivityTreatment.displayExerciseActivity(this.user_id, () => {
            console.log("The activities were well loaded")
        });
    }
}