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
    }
    export class StudentInfoTreatment {
        static getAllStudentCourses(callb : boolean, callbackFunc : any) : any;
    }
    export class Cookies {
        static Cookies(b : any, f:any, a:any, e:any) :any;
        static write(h:any, i:any) : any;
        static read(g:any) :any;
        static remove(g:any, h:any) :any;
    }
}