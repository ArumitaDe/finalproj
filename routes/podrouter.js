var express = require('express');
var router = express.Router();
var pod = require('../models/pod');
/* GET users listing. */
router.get('/img', (req, res, next)=>{
	// Comment out this line:
  //res.send('respond with a resource');

  /* And insert something like this instead:
  res.json([
      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/250/150/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/250/150/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]
);*/

pod.find(function (err, itms)
{
    if(err){
      console.log(err);
    }
    else {

      console.log(itms);
      res.json(itms)
    /*  res.json([
      

      {
        original: 'http://lorempixel.com/1000/600/nature/1/',
        thumbnail: 'http://lorempixel.com/1000/600/nature/1/',
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/2/',
        thumbnail: 'http://lorempixel.com/1000/600/nature/2/'
      },
      {
        original: 'http://lorempixel.com/1000/600/nature/3/',
        thumbnail: 'http://lorempixel.com/250/150/nature/3/'
      }
    ]);*/
    }
  });
});

module.exports = router;