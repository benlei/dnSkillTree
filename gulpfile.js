var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    del = require('del'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    tag = require('gulp-tag-version');

gulp.task('css', function () {
  gulp.src('./public/scss/*.scss')
      .pipe(concat('dnss.scss'))
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
  var src = [
    './public/js/dnss.js',
    './public/js/skill.js',
    './public/js/description.js'
  ];

  return gulp.src(src)
    .pipe(concat('dnss.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
});


function inc(importance) {
  return function() {
    gulp.src('./package.json')
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('[gulp] bumping package version'))
        .pipe(tag())
  };
}

gulp.task('patch', inc('patch'));
gulp.task('feature', inc('minor'));
gulp.task('release', inc('major'));
gulp.task('default', ['css', 'js'], function() {});