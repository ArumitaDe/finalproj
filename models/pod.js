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
  explanation: {
    type: String
  },
  hdurl: {
    type: String
  },
   media_type: {
    type: String
  },
   service_version: {
    type: String
  },
   title: {
    type: String
  },
 url: {
    type: String
  }

},{
	collection: 'items'
});

module.exports = mongoose.model('pod', pod);