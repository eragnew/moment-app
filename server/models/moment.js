var mongoose = require('mongoose');

var momentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  spotifyResource: {
    type: Mixed
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
