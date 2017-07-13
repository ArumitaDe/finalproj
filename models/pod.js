var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var pod = new Schema({
  copyright: {
    type: String
  },
  date: {
    type: Date
  },
  description: {
    type: String
  },
  original: {
    type: String
  },
   media_type: {
    type: String
  },
   title: {
    type: String
  },
     description: {
    type: String
  },
     thumbnailLabel: {
    type: String
  },
     thumbnailTitle: {
    type: String
  },
      thumbnail: {
    type: String
  },
     originalTitle: {
    type: String
  }

},{
	collection: 'one'
});

module.exports = mongoose.model('pod', pod);