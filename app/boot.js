// Boot Component
// Author : Alicia Parisse
// Description : 
//  	This component is the the boot component.
//		Its only job is to bootstrap the main component (personnal dashboard)
// Last-comment date : 02/03/16
System.register(['angular2/platform/browser', './personal-dashboard'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, personal_dashboard_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (personal_dashboard_1_1) {
                personal_dashboard_1 = personal_dashboard_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(personal_dashboard_1.PersonalDashboard);
        }
    }
});
//# sourceMappingURL=boot.js.map