var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

mongoose.connect(config.mongo.uri);

var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

server.listen(process.env.PORT || 3000, function() {
  console.log('server up on ' + (process.env.PORT || 3000) + '...');
});
