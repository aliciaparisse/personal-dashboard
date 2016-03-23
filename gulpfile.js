/**
 * Created by alicia on 10/03/2016.
 */
var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var del = require('del');
var concat = require('gulp-concat')
var runSequence = require('run-sequence');

// SERVER
gulp.task('clean', function(){
    return del('dist')
});

gulp.task('build:server', function()
{
    var tsProject = ts.createProject('server/tsconfig.json');

    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return tsResult.js.pipe(concat('server.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
});

// CLIENT

/*
 jsNPMDependencies, sometimes order matters here! so be careful!
 */
var jsNPMDependencies = [
    'angular2/platform/browser.d.ts',
    'angular2/core.d.ts',
    'angular2/bundles/angular2-polyfills.js',
    'systemjs/dist/system.src.js',
    'rxjs/bundles/Rx.js',
    'angular2/bundles/angular2.dev.js',
    'angular2/bundles/router.dev.js'
]

gulp.task('build:index', function(){
    var mappedPaths = jsNPMDependencies.map(file => {return path.resolve('node_modules', file)})

    //Let's copy our head dependencies into a dist/libs
    var copyJsNPMDependencies = gulp.src(mappedPaths, {base:'node_modules'})
        .pipe(gulp.dest('dist/libs'));

    //And do this to css, js .d.ts and fonts files
    var copyCss = gulp.src('client/css/**/*.css')
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

gulp.task('build', function(callback){
    runSequence('clean', 'build:server',
        'build:index',
        'build:app',
        callback);
});

gulp.task('default', ['build']);