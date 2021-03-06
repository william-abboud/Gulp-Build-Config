var gulp = require('gulp'); // Gulp, Duh
var less = require('gulp-less'); // LESS Compiler
var postcss = require('gulp-postcss'); // PostCSS processor
var autoprefixer = require('autoprefixer'); // Autoprefixer adds css vendor prefixes
var shorthand = require('gulp-shorthand'); // Shorthands long css properties
var csso = require('gulp-csso'); // Minifies CSS
var babel = require('gulp-babel'); // Babel transforms future JS to currently supported
var babelify = require('babelify'); // Additional plugin for Browserify
var browserify = require('browserify'); // Adds modularization (CommonJS) on the front end
var vinylbuffer = require('vinyl-buffer'); // Buffers gulp streams
var vinylsource = require('vinyl-source-stream'); // Transforms streams to gulp streams
var uglify = require('gulp-uglify'); // Minifies JS
var sourcemaps = require('gulp-sourcemaps'); // Sourcemaps generator
var plumber = require('gulp-plumber'); // Stops gulp from crashing on error
var del = require('del'); // Deletes files and folders
var sass = require('gulp-sass'); // SASS compiler
var gutil = require('gulp-util'); // Utilities for gulp
var jasmine = require('gulp-jasmine'); // Jasmine testing
var runSequence = require('run-sequence'); // Allows sequential run of gulp tasks
var notify = require('gulp-notify'); // Uses OS messaging system to notify the programmer
var through = require('gulp-through'); // Passes gulp streams and adds on
var watchify = require('watchify'); // Blazing fast change watcher for JS files
var bpolyfill = require('babel-polyfill'); // Adds ES6 future features

/* Config */
var SRC = './src';
var DIST = './dist';

/** HTML Tasks */

/**
 * Copies index.html from source to dist
 */
gulp.task('html', function() {
  return gulp.src(SRC + '/index.html')
    .pipe(gulp.dest(DIST));
});

/** Styles */

/**
 * Compiles LESS to CSS ready for production.
 * Applies the following transformations (in order):
 * - Reads from main.less file
 * - Generates sourcemaps
 * - Compiles LESS to CSS
 * - Autoprefixes CSS with vendor prefixes for last 2 browser versions
 * - Shorthands CSS properties
 * - Minifies CSS (removes whitespace and comments)
 * - Sends the transformed file to dist/styles
 */

gulp.task('less:production', function () {
  return gulp.src(SRC + '/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 version'] }) ]))
    .pipe(shorthand())
    .pipe(csso())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST + '/styles'));
});

/**
 * Compiles LESS to CSS for development.
 * Applies the following transformations (in order):
 * - Reads main.less file
 * - Generates sourcemaps
 * - Prevents task crashing Gulp on Error
 * - Notifies OS and console on error
 * - Compiles LESS to CSS
 * - Sends the transformed file to dist/styles
*/

gulp.task('less', function () {
  return gulp.src(SRC + '/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(plumber({ errorHandler: notify.onError('Error <%= error.message %>') }))
    .pipe(less())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST + '/styles'));
});

/**
 * Compiles SASS/SCSS to CSS ready for production.
 * Applies the following transformations (in order):
 * - Reads from main.scss file
 * - Generates sourcemaps
 * - Compiles SASS/SCSS to CSS
 * - Autoprefixes CSS with vendor prefixes for last 2 browser versions
 * - Shorthands CSS properties
 * - Minifies CSS (removes whitespace and comments)
 * - Sends the transformed file to dist/styles
 */

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

/**
 * Compiles SASS/SCSS to CSS for development.
 * Applies the following transformations (in order):
 * - Reads from main.scss file
 * - Generates sourcemaps
 * - Prevents task crashing Gulp on Error
 * - Notifies OS and console on error
 * - Compiles SASS/SCSS to CSS
 * - Sends the transformed file to dist/styles
 */

gulp.task('sass', function() {
  return gulp.src(SRC + '/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({ errorHandler: notify.onError('Error <%= error.message %>') }))
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DIST + '/styles'))
});

/** Scripts */

/**
 * Compiles ES6, JSX to supported JavaScript
 * Applies the following transformations (in order):
 * - Reads /scripts/main.js
 * - Modularizes JS code using CommonJS modules
 * - Compiles ES6, JSX
 * - Generates sourcemaps
 * - Minifies JavaScript
 * - Sends the transformed file to dist/scripts
*/
(function() {
  var props = {
    entries: [SRC + '/scripts/main.js'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  };

  gulp.task('js:production', function() {
    var bundler = browserify(SRC + '/scripts/main.js', props);
    bundler.transform(babelify, { sourceMaps: true });
    var stream = bundler.bundle();

    return stream
      .pipe(vinylsource('bundle.js'))
      .pipe(vinylbuffer()) 
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/scripts'));
  });

  var bundler = watchify(browserify(props));
  bundler.transform(babelify, { sourceMaps: true });
  bundler.on('update', bundle);
  bundler.on('log', gutil.log);

  function bundle() {
    var stream = bundler.bundle();

    return stream
      .on('error', notify.onError('Error <%= error.message %>'))
      .pipe(plumber())
      .pipe(vinylsource('bundle.js'))
      .pipe(vinylbuffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('dist/scripts'));
  }

  gulp.task('js', function() {
    return bundle();
  }); 
}());

/** Tests */
gulp.task('test', function() {
  gulp.src(SRC + '/tests/spec/test.js')
    .pipe(jasmine({ verbose: true }));
});

/** Misc */
/** 
 * Cleans (deletes) contents of the dist folder
*/
gulp.task('clean', function() {
  return del(['dist/**/*', '!dist']);
});

/** Watching */

/**
 * Runs 'sass' task first as a dependency.
 * Watches SASS files and runs 'sass' task on change.
 * Watch every .scss file in /sass folder and run 'less' task on change 
*/

gulp.task('watch:sass', ['sass'], function() {
  gulp.watch(SRC + '/sass/**/*.scss', ['sass']);
});

/**
 * Runs 'less' task first as a dependency.
 * Watches LESS files and runs 'less' task on change.
 * Watch every .less file in /less folder and run 'less' task on change 
*/

gulp.task('watch:less', ['less'], function() {
  gulp.watch(SRC + '/less/**/*.less', ['less']);
});


/**
 * Runs 'html' task first as a dependency.
 * Watches HTML files and runs 'html' task on change.
 * Watch every .html file in source folder and run 'html' task on change 
*/

gulp.task('watch:html', ['html'], function() {
  gulp.watch(SRC + '/**/*.html', ['html']);
});

/** Pipeline */
gulp.task('default', function (done) {
  // Check environment
  if (!!gutil.env.production) {
    runSequence('clean', ['js:production', 'less:production', 'html'], done);
  } else {
    runSequence('clean', ['js', 'watch:less', 'watch:html', 'watch:sass'], done);
  }
});