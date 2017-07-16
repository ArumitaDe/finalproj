const express = require('express');
const path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const app = express();
var podrouter = require('./routes/podrouter')
var request = require("request");
var schedule = require('node-schedule');
var pod = require('./models/pod');
/*

var j = schedule.scheduleJob('* 00 * * *', function() {
    request("https://api.nasa.gov/planetary/apod?api_key=XKfoeQE8mIxxmHoYpxZpduljk0xC3ad3XCicQxLZ&date=2017-06-01",

        function(error, response, data) {
            var body = JSON.parse(data);
            console.log("body.date", body.url);
            if(body.media_type!='video')

      
          {
            var image = new pod({
                "copyright": body.copyright,
                "date": body.date,
                "explanation": body.explanation,
                "original": body.url,
                "media_type": body.media_type,
                "title": body.title,
                "thumbnail": body.url

            });

            
            image.save();
          }
        });

});

{ request("https://api.nasa.gov/planetary/apod?api_key=XKfoeQE8mIxxmHoYpxZpduljk0xC3ad3XCicQxLZ&date=2017-07-07", 
  

    function(error, response, data) {
   var body = JSON.parse(data);
  console.log("body.date",body.url);
  var image = new pod({
  "copyright": body.copyright,
  "date": body.date,
  "description1": body.explanation,
  "description": body.title +". Dated - "+body.date+".",
  "original": "https://process.filestackapi.com/AAroAJCWESsSFzu09ec7rz/resize=width:650,height:450,fit:scale/"+body.url,
  "modalurl":body.url,
  "media_type": body.media_type,
 "originalTitle1": body.title,
 "thumbnailTitle1": body.date,
 "thumbnailLabel1":body.date,
 "thumbnail": "https://process.filestackapi.com/AAroAJCWESsSFzu09ec7rz/resize=width:650,height:450,fit:scale/"+body.url


});
   if(body.media_type!='video')
  image.save();
}); }


/*


setInterval(function(){ request("https://api.nasa.gov/planetary/apod?api_key=pgWVAwOzwqCCZF5iHXxWh2vzTL89ggO0WmYcgP2Z", 

    function(error, response, data) {
   var body = JSON.parse(data);
  console.log("body.date",body.hdurl);
  var image = new pod({
  "copyright": body.copyright,
  "date": body.date,
  "explanation": body.explanation,
  "original": body.hdurl,
   "media_type": body.media_type,
   "title": body.title,
 "thumbnail": body.url

});
  image.save();
}); }, 300000000000000000000000000000000000000000000000000000000000000000000000000000000000);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

*/
// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
//
  
if(process.env.MONGODB_URI)
{
  mongoose.connect(process.env.MONGODB_URI);
}
else
mongoose.connect('mongodb://localhost/nasa');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/pod', podrouter);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);
