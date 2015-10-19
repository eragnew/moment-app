var gulp = require("gulp");
var config = require('../config').html;

gulp.task('html', function() {
  return gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
});

gulp.task('html', function() {
  return gulp.src(config.viewsSrc)
  .pipe(gulp.dest(config.viewsDest));
});
