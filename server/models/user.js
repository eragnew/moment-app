var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var userSchema = new mongoose.Schema({
  spotifyID: {
    type: String,
    unique: true
  },
  profile: {
    type: Object
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  }
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
