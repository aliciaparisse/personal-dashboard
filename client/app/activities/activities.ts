import {Component} from "angular2/core";
import {ExercisesActivity} from "./exercises-activity";

/// <reference path="../../libs/js-cookie.d.ts"/>

@Component({
    selector:'activities',
    directives:[ExercisesActivity],
    template:`<exercises-activity [user_id]="user_id"></exercises-activity>`
})

export class Activities{
    user_id;
    constructor(){
        var self = this;
        self.user_id = JSON.parse(Cookies.get("oauth_token")).username;
        console.log(this.user_id);
    }

}