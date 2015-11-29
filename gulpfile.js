var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    git = require('gulp-git'),
    bump = require('gulp-bump'),
    tag = require('gulp-tag-version');

var css_src = './public/scss/*.scss';
var js_src = [
  './public/js/dnss.js',
  './public/js/skill.js',
  './public/js/description.js'
];

gulp.task('css', function () {
  gulp.src(css_src)
      .pipe(concat('dnss.scss'))
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
  return gulp.src(js_src)
    .pipe(concat('dnss.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
});

gulp.task('watch', function() {
  gulp.watch(css_src, ['css']);
  gulp.watch(js_src, ['js']);
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