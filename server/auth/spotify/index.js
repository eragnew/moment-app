var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var app = express();
var router = express.Router();

router.get('/',
  passport.authenticate('spotify', {
    scope: ['playlist-read-private', 'user-library-read', 'user-follow-read'],
    session: false
  }),
  function(req, res) {
    // request will be redirected to Spotify, so this function will not be called
  });

router.get('/callback',
  passport.authenticate('spotify', {
    failureRedirect: '/',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
