var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./environment');
var passport = require('passport');

module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(express.static(__dirname + '/../../build'));
};
