var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var momentSchema = new mongoose.Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  spotifyResource: {
    type: String
  },
  content: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  dateModified: {
    type: Date,
    default: Date.now()
  },
  tags: [{tag: String}]
});

module.exports = mongoose.model('Moment', momentSchema);
