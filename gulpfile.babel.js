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
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var jasmine = require('gulp-jasmine');
var runSequence = require('run-sequence');
var notify = require('gulp-notify');
var through = require('gulp-through');

/* Constants */
var SRC = './src';
var DIST = './dist';

/* HTML */
gulp.task('html', function() {
  return gulp.src(SRC + '/index.html')
    .pipe(gulp.dest(DIST));
});

/* Styles */
gulp.task('less:production', function () {
  return gulp.src(SRC + '/**/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(shorthand())
    .pipe(csso())
    .pipe(gulp.dest(DIST + '/styles'));
});

gulp.task('less', function () {
  return gulp.src(SRC + '/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(plumber({ errorHandler: notify.onError('Error <%= error.message %>') }))
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST + '/styles'));
});

gulp.task('sass:production', function() {
  return gulp.src(SRC + '/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(shorthand())
    .pipe(csso())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST + '/styles'));
});

gulp.task('sass', function() {
  return gulp.src(SRC + '/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({ errorHandler: notify.onError('Error <%= error.message %>') }))
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST + '/styles'))
});

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
    .on('error', notify.onError('Error <%= error.message %>'))
    .pipe(plumber())
    .pipe(vinylsource('bundle.js'))
    .pipe(vinylbuffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/scripts'));
});

/* Tests */
gulp.task('test', function() {
  gulp.src(SRC + '/tests/spec/test.js')
    .pipe(jasmine({ verbose: true }));
});

/* Misc */
gulp.task('clean', function() {
  return del(['dist/**', '!dist']);
});

/* Watching */
gulp.task('watch:js', ['js'], function() {
  gulp.watch([SRC + '/scripts/**/*.js', SRC + '/scripts/**/*.jsx'], ['js']);
});

gulp.task('watch:sass', ['sass'], function() {
  gulp.watch(SRC + '/sass/**/*.scss', ['sass']);
});

gulp.task('watch:less', ['less'], function() {
  gulp.watch(SRC + '/less/**/*.less', ['less']);
});

gulp.task('watch:html', ['html'], function() {
  gulp.watch(SRC + '/**/*.html', ['html']);
});

/* Pipeline */
gulp.task('watch', ['watch:js', 'watch:less', 'watch:html']);

gulp.task('default', function (done) {
  runSequence('clean', ['watch'], done);
});