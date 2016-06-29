'use strict';

var express = require('express'),
  router = express.Router(),
  twilio = require('twilio');

// POST /call/incoming
router.post('/incoming/', function (req, res) {
  var twimlResponse = new twilio.TwimlResponse();
  twimlResponse.gather({
    numDigits: 1
  });
  res.type('text/xml');
  res.send(twimlResponse.toString());
});

module.exports = router;
