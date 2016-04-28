import {Component} from "angular2/core";
import {ExercisesActivity} from "./exercises-activity";

/// <reference path="../../libs/js-cookie.d.ts"/>

@Component({
    selector:'activities',
    directives:[ExercisesActivity],
    template:`<exercises-activity (loaded) ="activitiesLoaded($event)"></exercises-activity>
    <!--<div [hidden]="!loading" class="loading-message">
		Please wait while the activities are being loaded...
	</div>-->`

})

export class Activities{
    user_id;
    loading;

    constructor(){
        var self = this;
        self.loading = true;
        //self.user_id = JSON.parse(Cookies.get("oauth_token")).username;
        //console.log(this.user_id);
    }

    activitiesLoaded(event){
        console.log("comingHere ?")
        this.loading = false;

    }
}