// Activities Component
// Author : Alicia Parisse
// Description :
//		This component is representing all the activities.
//		For now it's only composed of exercises-acitivity component.
//      However this file is the one in which other directives representing acitivities will be added
// Last-comment date : 30/05/16

import {Component} from "angular2/core";
import {ExercisesActivity} from "./exercises-activity";

/// <reference path="../../libs/js-cookie.d.ts"/>

@Component({
    selector:'activities',
    directives:[ExercisesActivity],
    template:`
    <exercises-activity></exercises-activity>

	`

})

export class Activities{
    user_id;
}