var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var del  = require('del');
var rigger = require('gulp-rigger');


gulp.task('sass', function () {
    return gulp.src('src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css/'));
});
//build css
gulp.task('css-build', function(){
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('public/css/'))
});
//build js
gulp.task('fonts-build', function(){
    gulp.src('src/vendor/fonts/*')
    .pipe(gulp.dest('public/survey/fonts/'))
});
//build html with Dependencies
gulp.task('html-build', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('public/'));
});
//build data

//build img
gulp.task('img-build', function () {
    gulp.src('src/img/**/')
    .pipe(gulp.dest('public/img/'));
});

//rigger html
gulp.task('rigger-html', function () {
    gulp.src('src/html-parts/index-parts/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('src/'));
});

//rigger js
gulp.task('rigger-js', function () {
    gulp.src('src/js/parts/main.js')
        .pipe(rigger())
        .pipe(gulp.dest('src/js/'));
});

//all build
gulp.task('build', 
[
    'html-build',
    'fonts-build',
    'img-build',
    'css-build',
]);

// Clean public
gulp.task('build-clean', function(){
    return del(['public/*']);
});


// Static Server + watching css/html files
gulp.task('serv', function() {
    browserSync.init({
        server: "./src/"
    });
    gulp.watch('src/js/parts/*.js',['rigger-js'] );
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
    gulp.watch('src/scss/*.scss',['sass']);
    gulp.watch('src/html-parts/index-parts/**/*.html',['rigger-html']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/css/*.css' ).on('change', browserSync.reload);
});



