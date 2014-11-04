'use strict';

var gulp = require('gulp');

/**** Gulp Plug-ins **********************************************************************/

var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var changed = require('gulp-changed');
var fileinclude = require('gulp-file-include');
var useref = require('gulp-useref');
var watch = require('gulp-watch');
var jsonminify = require('gulp-jsonminify');
var rename = require("gulp-rename");
var htmlhint = require("gulp-htmlhint");
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var useref = require('gulp-useref');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var filter = require('gulp-filter');
var csso = require('gulp-csso');
var cleanhtml = require('gulp-cleanhtml');
var uglify = require('gulp-uglify');
var size = require('gulp-filesize');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');

/**** Dev Tasks **************************************************************************/

gulp.task('cleanDev', function() {
    return gulp.src(['./wwwDev/*','!./wwwDev/bower_components'], {read: false})
        .pipe(clean());
});

gulp.task('runDevTasks', function(){
    var htmlFilter = filter('**/*.html');
    return gulp.src(['./src/**/*.*'], { base: './src' })
        .pipe(htmlFilter)
        .pipe(fileinclude())
        .pipe(htmlFilter.restore())
        .pipe(gulp.dest('wwwDev'));
});

gulp.task('validatejsHintRc', function () {
    gulp.src('./.jshintrcCommented.txt')
        .pipe(jsonminify())
        .pipe(rename('.jshintrc'))
        .pipe(gulp.dest('./'));
});

/**** Build Tasks *************************************************************************/

gulp.task('cleanBuild', function() {
    return gulp.src(['./wwwBuild/*'], {read: false})
        .pipe(clean());
});

gulp.task('buildFromDev', function () {
    var assets = useref.assets();
    return gulp.src(['./wwwDev/**/*.html',
        '!./wwwDev/bower_components/**/*.*',
        '!./wwwDev/shared/**/*.*',
        '!./wwwDev/ui/**/*.*'])
        .pipe(assets)
        .pipe(rev())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(revReplace())  
        .pipe(gulp.dest('./wwwBuild'));
});

gulp.task('moveKendoImages', function(){
    return gulp.src(['./wwwDev/bower_components/kendo-ui/styles/images/**/*.*'])
        .pipe(gulp.dest('./wwwBuild/thirdparty/images'));
});

gulp.task('moveKendoFlatTheme', function(){
    return gulp.src(['./wwwDev/bower_components/kendo-ui/styles/Flat/**/*.*'])
        .pipe(gulp.dest('./wwwBuild/thirdparty/Flat'));
});

gulp.task('moveBootstrapCSSStuff', function(){
    gulp.src(['./wwwDev/bower_components/bootstrap/dist/fonts/**/*.*'])
        .pipe(gulp.dest('./wwwBuild/thirdparty/fonts'));
    return gulp.src(['./wwwDev/bower_components/bootstrap/dist/css/bootstrap.css.map'])
        .pipe(gulp.dest('./wwwBuild/thirdparty/'));
});

gulp.task('cssLint', function() {
    return gulp.src('./wwwBuild/*.css')
        .pipe(csslint('./.csslintrc'))
        .pipe(csslint.reporter());
});

gulp.task('htmlHint', function () {
     return gulp.src(['./wwwBuild/index.html'])
        .pipe(htmlhint({htmlhintrc:'.htmlhintrc'}))
        .pipe(htmlhint.reporter());
});

gulp.task('jsHint', function() {
     return gulp.src(['./wwwBuild/*.js'])
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('default'));
});

//minify html
gulp.task('minifyHtml', function(){
     return gulp.src(['./wwwBuild/index.html'])
        .pipe(cleanhtml())
        .pipe(gulp.dest('./wwwBuild'));
});

gulp.task('minifyCss', function() {
     return gulp.src(['./wwwBuild/**/*.css'])
        .pipe(csso())
        .pipe(gulp.dest('./wwwBuild'));
});

gulp.task('minifyJs', function() {
     return gulp.src(['./wwwBuild/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./wwwBuild'));
});

gulp.task('reportSize', function() {
     return gulp.src(['./wwwBuild/**/*.js','./wwwBuild/**/*.css'])
        .pipe(size());
});

/**** Servers ****************************************************************************/

//dev sever
gulp.task('startDevServer', function() {
    return gulp.src( 'wwwDev')
        .pipe(webserver({
            host:'0.0.0.0',
            port:'3027',
            livereload:true,
            directoryListing: false,
            open: true
        }));
});

//build server
gulp.task('startBuildServer', function() {
    return gulp.src( 'wwwBuild')
        .pipe(webserver({
            host:'0.0.0.0',
            port:'3028',
            livereload:false,
            directoryListing: false,
            open: true
        }));
});

//watch
gulp.task('watch', function(){
    gulp.watch(['src/**/*.*'],['runDevTasks']);
    return gulp.watch(['./.jshintrcCommented.txt'],['validatejsHintRc','runDevTasks']);
});

/**** Tasks ********************************************************************************/

gulp.task('dev', function(callback) {
    runSequence('cleanDev','runDevTasks', callback);
    return false;
});

gulp.task('build', function(callback) {
    runSequence('cleanBuild','buildFromDev','cssLint','htmlHint','jsHint','minifyHtml','minifyCss','minifyJs','moveKendoImages','moveKendoFlatTheme','moveBootstrapCSSStuff','startBuildServer', 'reportSize', callback);
    return false;
});
