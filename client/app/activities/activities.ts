import {Component} from "angular2/core";
import {ExercisesActivity} from "./exercises-activity";

@Component({
    selector:'activities',
    directives:[ExercisesActivity],
    template:`<exercises-activity></exercises-activity>`
})

export class Activities{

}