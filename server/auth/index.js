var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var User = require('../api/user/user.model');

require('./spotify/passport').setup(User, config);

var router = express.Router();

router.use('/spotify', require('./spotify'));

module.exports = router;
