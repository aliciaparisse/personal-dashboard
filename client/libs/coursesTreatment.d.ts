/**
 * Created by parisse on 16.3.2016.
 */
declare module CoursesTreatment{
    interface CoursesTreatmentStatics {
        createDisplayableData(course : any, colors : any) : any;
        sepExInWeeks(exercises : any) : any;
        courseCompDiagram(course : any, colors : any) : any;
    }
}

declare var CoursesTreatment: CoursesTreatment.CoursesTreatmentStatics;

declare module 'coursesTreatment' {
    export = CoursesTreatment;
}