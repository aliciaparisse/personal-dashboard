/**
 * Created by parisse on 21.3.2016.
 */

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

    @Output() loaded = new EventEmitter();

    constructor() {
        var self = this;
        self.user_id = JSON.parse(Cookies.get("oauth_token")).username;
        ActivityTreatment.displayExerciseActivity(this.user_id, () => {
            console.log("and there ?")
            this.loaded.emit(true);
            console.log("Event was sent!")
        });
    }
}