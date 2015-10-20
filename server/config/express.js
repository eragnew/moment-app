var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./environment');
var passport = require('passport');
var path = require('path');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(express.static(path.resolve(__dirname + '/../../build')));
};
