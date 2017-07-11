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
  original: {
    type: String
  },
   media_type: {
    type: String
  },
   title: {
    type: String
  }
},{
	collection: 'one'
});

module.exports = mongoose.model('pod', pod);