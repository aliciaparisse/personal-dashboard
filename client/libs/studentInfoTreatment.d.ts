/**
 * Created by parisse on 16.3.2016.
 */
declare module StudentInfoTreatment{
    interface StudentInfoTreatmentStatics {
        getAllStudentCourses(callb : boolean, callbackFunc : any) : any;
    }
}

declare var StudentInfoTreatment: StudentInfoTreatment.StudentInfoTreatmentStatics;

declare module 'studentInfoTreatment' {
    export = StudentInfoTreatment;
}