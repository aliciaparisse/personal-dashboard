System.register(['angular2/platform/browser', './personal-dashboard'], function(exports_1) {
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