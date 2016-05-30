// GulpFile
// Author : Alicia Parisse
// Description :
//		This file is meant to be used for the building of the application.
//      This file is separated into different tasks.
//      There are tasks that are done for the server side and some for the client side.
//      For more information than what's already contained in this file, please see the global project description
// Last-comment date : 30/05/16


var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var del = require('del');
var concat = require('gulp-concat')
var runSequence = require('run-sequence');


// SERVER SIDE TASKS ---------------------------------------------

//Cleaning the server, deleting the dist directory
gulp.task('clean', function(){
    return del('dist')
});

//Building the server
gulp.task('build:server', function()
{
    //Here is the part where the TypeScript files are compiled and send to the dist directory
    //For now there aren't .ts files on the server side, but it can happen later.
    var tsProject = ts.createProject('server/tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js.pipe(concat('server.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
});

// CLIENT SIDE TASKS ---------------------------------------------


// jsNPMDependencies, sometimes order matters here! so be careful!
// Those dependencies includes the .d.ts files that you are going to use in your .ts files on the client side

var jsNPMDependencies = [
    'angular2/platform/browser.d.ts',
    'angular2/core.d.ts',
    'angular2/bundles/angular2-polyfills.js',
    'systemjs/dist/system.src.js',
    'rxjs/bundles/Rx.js',
    'angular2/bundles/angular2.dev.js',
    'angular2/bundles/router.dev.js'
]

//This task is building the index, so building the client.
//It is mostly composed of copying files where they are needed

//Everything is moved in dist or in a dist subdirectory
gulp.task('build:index', function(){
    var mappedPaths = jsNPMDependencies.map(file => {return path.resolve('node_modules', file)})

    //Let's copy our head dependencies into a dist/libs
    var copyJsNPMDependencies = gulp.src(mappedPaths, {base:'node_modules'})
        .pipe(gulp.dest('dist/libs'));

    //And do this to css, js .d.ts and fonts files
    var copyCss =
        //We take all the files that are contained anywhere in the css directory and having a .css extension
        gulp.src('client/css/**/*.css')
        //We send it to dist/css
        .pipe(gulp.dest('dist/css'));

    var copyJs = gulp.src('client/libs/**/*.js')
        .pipe(gulp.dest('dist/libs'));

    var copyDTs = gulp.src('client/libs/**/*.d.ts')
        .pipe(gulp.dest('dist/libs'));

    var copyFonts = gulp.src('client/**/fonts/*')
        .pipe(gulp.dest('dist/'));

    //Let's copy our index into dist
    var copyIndex = gulp.src('client/index.html')
        .pipe(gulp.dest('dist'));

    return [copyJsNPMDependencies, copyCss, copyJs, copyDTs, copyFonts, copyIndex];
});

//This tasks compiles all the Typescript files, creates sourcemaps files and writes the .js compiled file inside
//the dist/app directory
gulp.task('build:app', function(){
    var tsProject = ts.createProject('client/tsconfig.json');
    var tsResult = gulp.src('client/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/app/'))

});
var typescript = require('gulp-tsc');

//This task is just a list of tasks that are launched with the runSequence command.
gulp.task('build', function(callback){
    runSequence('clean',
        'build:server',
        'build:index',
        'build:app',
        callback);
});

//This task represents the default task
//When you call only "gulp", it will come find the default task and launch the associated task (here build)
//So it will launch "gulp build"
// For any other task, you have to write clearle "gulp clean" for example.
gulp.task('default', ['build']);