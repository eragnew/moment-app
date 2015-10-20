var passport = require('passport');
var SpotifyStrategy = require('passport-spotify').Strategy;
var findOrCreate = require('mongoose-findorcreate');

exports.setup = function(User, config) {
  console.log(config);
  passport.use(new SpotifyStrategy({
    clientID: config.spotify.clientId,
    clientSecret: config.spotify.clientSecret,
    callbackURL: config.spotify.spotifyCallback
  }, function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log('access token: ' + accessToken);
    console.log('refresh token: ' + refreshToken);
    User.findOne({
      'spotifyID': profile.id
    }, function(err, user) {
      if (err) return done(err);
      if (!user) {
        user = new User({
          spotifyID: profile.id,
          profile: profile,
          accessToken: accessToken,
          refreshToken: refreshToken
        });
        user.save(function(err) {
          if (err) return done(err);
          return done(err, user);
        });
      } else {
        user.accessToken = accessToken;
        user.save(function(err) {
          if (err) return done(err);
          return done(err, user);
        });
      }
    });
  }));
};
