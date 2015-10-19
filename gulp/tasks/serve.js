var gulp = require('gulp');
var config = require('../config').server;
var server = require("gulp-express");

gulp.task('serve', ['sass', 'fonts', 'html', 'webpack', 'watch'], function() {
  server.run([config.serverFile]);

 gulp.watch([config.serverFile], [server.run]);
});
