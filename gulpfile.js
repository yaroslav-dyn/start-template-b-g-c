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

//rigger html * dev
gulp.task('rigger-html', function () {
    gulp.src('src/html-parts/index-parts/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('src/'));
});

//rigger js * dev
gulp.task('rigger-js', function () {
    gulp.src('src/js/parts/main.js')
        .pipe(rigger())
        .pipe(gulp.dest('src/js/'));
});

//build vendor modules * dev
gulp.task('vendor-modules-css', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/vendor/bootstrap_4'))
        .pipe(browserSync.stream());
});
//build vendor modules * dev
gulp.task('vendor-modules-js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js', 'node_modules/jquery/dist/jquery.min.js' ])
        .pipe(gulp.dest('src/vendor/'))

});


//build css * prod
gulp.task('css-build', function(){
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('public/css/'))
});

//build html with Dependencies * prod
gulp.task('html-build', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('public/'));
});

//build img * prod
gulp.task('img-build', function () {
    gulp.src('src/img/**/')
    .pipe(gulp.dest('public/img/'));
});


//all build * dev
gulp.task('build:dev', [
    'vendor-modules-css',
    'vendor-modules-js',
    'sass',
    'rigger-html',
    'rigger-js'
]);

//all build * prod
gulp.task('build', [
    'html-build',
    'img-build',
    'css-build'
]);

// Clean public
gulp.task('build-clean', function(){
    return del(['public/*']);
});


// Static Server + watching css/html files
gulp.task('serve', ['build:dev'], function() {

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


gulp.task('serve:dist', ['build'], function() {
    browserSync.init({
        server: "./public/"
    });
});

