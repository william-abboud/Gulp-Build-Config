var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var shorthand = require('gulp-shorthand');
var csso = require('gulp-csso');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var viniylbuffer = require('vinyl-buffer');
var vinylsource = require('vinyl-source-stream');

/* Constants */
var SRC = './src';
var DIST = './dist';

/* Styles */
gulp.task('less:production', function () {
  return gulp.src(SRC + '/**/main.less')
    .pipe(less())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(shorthand())
    .pipe(csso())
    .pipe(gulp.dest(DIST + '/styles'));
});

gulp.task('less', function () {
  return gulp.src(SRC + '/**/main.less')
    .pipe(less())
    .pipe(gulp.dest(DIST + '/styles'));
});

/* Scripts */
gulp.task('js', function() {
  var bundler = browserify(SRC + '/scripts/main.js');
  bundler.transform(babelify);

  bundler
    .bundle()
    .pipe(vinylsource('main.js'))
    .pipe(viniylbuffer())
    .pipe(gulp.dest('dist/scripts'))
});