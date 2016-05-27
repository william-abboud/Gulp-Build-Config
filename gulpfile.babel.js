var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var shorthand = require('gulp-shorthand');
var csso = require('gulp-csso');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylbuffer = require('vinyl-buffer');
var vinylsource = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var del = require('del');

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
  return gulp.src(SRC + '/less/main.less')
    .pipe(less())
    .pipe(gulp.dest(DIST + '/styles'));
});

gulp.task('sass', function() {});

/* Scripts */
gulp.task('js:production', function() {
  var bundler = browserify(SRC + '/scripts/main.js', { debug: true });
  bundler.transform(babelify, { sourceMaps: true });

  return bundler
  .bundle()
  .pipe(vinylsource('bundle.js'))
  .pipe(vinylbuffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/scripts'));
});

gulp.task('js', function() {
  var bundler = browserify(SRC + '/scripts/main.js', { debug: true });
  bundler.transform(babelify, { sourceMaps: true });

  return bundler
  .bundle()
  .pipe(vinylsource('bundle.js'))
  .pipe(vinylbuffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('dist/scripts'));
});

/* Misc */
gulp.task('clean', function() {
  return del(['dist/**', '!dist']);
});

gulp.task('build', ['clean']);
