var Moment = require('./moment.model');
var User = require('../user/user.model');

exports.index = function(req, res) {
  Moment.find({}, function(err, moments) {
    if (err) return res.send(500, err);
    res.json(200, moments);
  });
};

exports.create = function(req, res, next) {
  var newMoment = new Moment(req.body);
  newMoment.save(function(err, moment) {
    if (err) return res.send(500, err);
    res.json(200, moment);
  });
};

exports.show = function(req, res, next) {
  var momentId = req.params.id;
  Moment.findById(momentId, function(err, moment) {
    if (err) return next(err);
    if (!moment) return res.send(401);
    res.json(200, moment);
  });
};

exports.update = function(req, res) {
  if (req.body._id) delete req.body._id;
  Moment.findById(req.params.id, function(err, moment) {
    if (err) return res.send(500, err);
    if (!moment) return res.send(404);
    var newMomentBody = req.body;
    Moment.update({_id: req.params.id}, newMomentBody, function(err, data) {
      if (err) return res.send(500, err);
      res.json(200, data);
    });
  });
};

exports.destroy = function(req, res) {
  Moment.findById(req.params.id, function(err, moment) {
    if (err) return res.send(500, err);
    if (!moment) return res.send(404);
    moment.remove(function(err) {
      if (err) return res.send(500, err);
      return res.send(204);
    });
  });
};
