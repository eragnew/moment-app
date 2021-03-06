var Moment = require('./moment.model');
var User = require('../user/user.model');

exports.index = function(req, res) {
  Moment.find({userID: req.user._id}, function(err, moments) {
    if (err) return res.status(500).send(err);
    res.status(200).json(moments);
  });
};

exports.create = function(req, res, next) {
  var newMoment = new Moment(req.body);
  newMoment.userID = req.user._id;
  newMoment.save(function(err, moment) {
    if (err) return res.status(500).send(err);
    res.status(200).json(moment);
  });
};

exports.show = function(req, res, next) {
  var momentId = req.params.id;
  Moment.findById(momentId, function(err, moment) {
    if (err) return next(err);
    if (!moment) return res.status(401);
    res.status(200).json(moment);
  });
};

exports.update = function(req, res) {
  if (req.body._id) delete req.body._id;
  Moment.findById(req.params.id, function(err, moment) {
    if (err) return res.status(500).send(err);
    if (!moment) return res.status(404);
    var newMomentBody = req.body;
    Moment.update({_id: req.params.id}, newMomentBody, function(err, data) {
      if (err) return res.status(500).send(err);
      res.status(200).json(data);
    });
  });
};

exports.destroy = function(req, res) {
  Moment.findById(req.params.id, function(err, moment) {
    if (err) return res.status(500).send(err);
    if (!moment) return res.status(404);
    moment.remove(function(err) {
      if (err) return res.status(500).send(err);
      return res.status(204);
    });
  });
};

exports.stats = function(req, res) {
  var statsArr = [];
  Moment.where({userID: req.user._id}).count(function(err, count) {
    if (err) return res.status(500).send(err);
    statsArr.push(count);
    Moment.find({userID: req.user._id}, function(err, moments) {
      var tagCount = 0;
      for (var i = 0; i < moments.length; i++) {
        tagCount += moments[i].tags.length;
      }
      statsArr.push(tagCount);
      return res.status(200).json(statsArr);
    });
  });
};
