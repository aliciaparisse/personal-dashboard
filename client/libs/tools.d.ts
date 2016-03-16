/**
 * Created by parisse on 16.3.2016.
 */
declare module Tools{
    interface ToolsStatics {
        getColors(nbColors : number) : any;
        getCorrColors(color : string) : any;
        changeExercColor(courseName : string, colors : any) : any;
        login(username : string, password : string, successCb : any, errorCb : any) :void;
    }
}

declare var Tools: Tools.ToolsStatics;

declare module 'tools' {
    export = Tools;
}