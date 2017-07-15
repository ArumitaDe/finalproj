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
  description1: {
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
     thumbnailTitle1: {
    type: String
  },
      thumbnail: {
    type: String
  },
   modalurl: {
    type: String
  },
     originalTitle1: {
    type: String
  }

},{
	collection: 'one'
});

module.exports = mongoose.model('pod', pod);