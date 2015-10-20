var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var momentSchema = new mongoose.Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  spotifyResource: {
    type: Schema.Types.Mixed
  },
  content: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateModified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Moment', momentSchema);
