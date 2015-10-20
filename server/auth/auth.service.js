var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');
var validateJwt = expressJwt({secret: config.secrets.session});

function isAuthenticated() {
  return compose()
    .use(function(req, res, next) {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    .use(function(req, res, next) {
      User.findById(req.user._id, function(err, user) {
        if (err) return next(err);
        if (!user) return res.send(401);

        req.user = user;
        next();
      });
    });
}

function hasRole(roleRequired) {
  if (!roleRequired) throw new Error('Required role needs to be set');

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.send(403);
      }
    });
}

function signToken(id) {
  return jwt.sign({_id: id}, config.secrets.session, {expiresInMinutes: 60*5});
}

function setTokenCookie(req, res) {
  console.log('setting token');
  console.log();
  if (!res.user) return res.json(404, {message: 'something went wrong'});
  var token = signToken(req.user._id, req.user.role);
  console.log(token);
  res.cookie('token', JSON.stringify(token));
  res.redirect('/start');
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
