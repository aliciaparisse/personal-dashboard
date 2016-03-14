declare module PersonalDashboardModule {
    export class CoursesTreatment {
        static createDisplayableData(course : any, colors : any) : any;
        static sepExInWeeks(exercises : any) : any;
        static courseCompDiagram(course : any, colors : any) : any;
    }
    export class Tools {
        static getColors(nbColors : number) : any;
        static getCorrColors(color : string) : any;
        static changeExercColor(courseName : string, colors : any) : any;
        static login(username : string, password : string, successCb : any, errorCb : any) :void;
    }
    export class StudentInfoTreatment {
        static getAllStudentCourses(callb : boolean, callbackFunc : any) : any;
    }

}