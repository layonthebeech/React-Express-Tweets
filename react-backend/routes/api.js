var express = require('express');
var router = express.Router();
var Twitter = require('twit');
var consumer_key = process.env.CONSUMER_KEY;
var consumer_secret = process.env.CONSUMER_SECRET;
var access_token_secret = process.env.ACCESS_TOKEN_SECRET;
var at = process.env.AT;

const T = new Twitter({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: at,
  access_token_secret: access_token_secret
});


/* GET home page. */
router.post('/searchUsers', function(req, res, next) {
  const userName = req.body.userName;
  console.log(userName)
  T.get('users/search', { q: userName }, function(err, data, response) {
    console.log('searchUsers')
    if(err) {
      res.json([])
    } else {
      res.json(data)
    }
    
  })
});

router.post('/getTweets', function(req, res, next) {
  const userName = req.body.userName;
  console.log(userName)
  T.get('statuses/user_timeline', { screen_name: userName }, function(err, data, response) {
    console.log('gettweets')
    if(err) {
      res.json([])
    } else {
      res.json(data)
    }
    
  })
});

module.exports = router;
