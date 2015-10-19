var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var mongoose = require('mongoose');
var User = require(__dirname + '/models/user');
var spotifyConfig = require(__dirname + '/spotify-config');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/moment_dev');

var app = express();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SpotifyStrategy({
  clientID: spotifyConfig.appKey,
  clientSecret: spotifyConfig.appSecret,
  callbackURL: 'http://localhost:3000/auth/spotify/callback'
}, function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({spotifyID: profile.id}, {
    profile: profile,
    accessToken: accessToken,
    refreshToken: refreshToken,
  }, function(err, user) {
    return done(err, user);
  });
}));

app.use(bodyparser.json());
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'this is secret; changemechangemechangeme'
}));
app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

app.get('/', function(req, res) {
  res.send('<html><body><a href="/auth/spotify">log in with Spotify</a></body></html>');
});

app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private'], showDialog: true}),
  function(req, res) {
    console.log('attempting to authenticate with spotify');
  }
);

app.get('/auth/spotify/callback',
  passport.authenticate('spotify', {failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  req.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server running on port ' + (process.env.PORT || 3000) + '...');
});
