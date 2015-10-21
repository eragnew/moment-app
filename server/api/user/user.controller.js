var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

exports.index = function(req, res) {
  User.find({}, function(err, users) {
    if (err) return res.send(500, err);
    res.json(200, users);
  });
};

exports.create = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresIn: 60*5*60});
    res.json({token: token});
  });
};

exports.show = function(req, res, next) {
  var userId = req.params.id;
  User.findById(userId, function(err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.send(500, err);
    return res.send(204);
  });
};

exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, function(err, user) {
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
