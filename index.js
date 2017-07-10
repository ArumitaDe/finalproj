const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const app = express();
var podrouter=require('./routes/podrouter')

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://krunal1021:krunal1021@ds139322.mlab.com:39322/aufinancex')
    .then(() => { // if all is ok we will be here
      console.log('Start');
    })
    .catch(err => { // if error we will be here
        console.error('App starting error:', err.stack);
        process.exit(1);
    });


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/pod', podrouter);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

