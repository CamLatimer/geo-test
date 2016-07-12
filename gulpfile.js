// dependencies
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync').create();
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');

// 'jshint' shows js errors
gulp.task('jshint', function() {
  return gulp.src(['*.js', './js/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

// 'watchers' watches changes in files and reloads browser on change
var watchers = function() {
  gulp.watch(['*.*', './styles/sass/*.scss', '*.js', './js/*.js'], ['sass']).on('change', browserSync.reload);
};

// 'sass' compiles sass and pipes to destination dir
gulp.task('sass', function () {
  return gulp.src('./styles/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
  .pipe(gulp.dest('./styles/css/'))
  .pipe(browserSync.stream());
  // .stream() auto injects changes into browser; affects page state, instead of just injecting styles

});

// 'sync' starts up browser synce and 'watchers'
gulp.task('sync', function() {
  browserSync.init({
    server:{
      baseDir: '.',
      directory: true
    },
    open: false
  });
  watchers();
});

// when gulp starts, it'll run 'jshint', 'sync', and 'sass'
gulp.task('default', ['jshint', 'sync', 'sass']);
