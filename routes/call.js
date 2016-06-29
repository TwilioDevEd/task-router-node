'use strict';

var express = require('express'),
  router = express.Router(),
  twilio = require('twilio');

// POST /call/incoming
router.post('/incoming/', function (req, res) {
  var twimlResponse = new twilio.TwimlResponse();
  twimlResponse.gather({
    numDigits: 1,
    action: '/call/enqueue',
    method: 'POST'
  }, function(gatherNode) {
    gatherNode.say('For Programmable SMS, press one. For Voice, press any other key.');
  });
  res.type('text/xml');
  res.send(twimlResponse.toString());
});

// POST /call/enqueue
router.post('/enqueue/', function (req, res) {
  var pressedKey = req.body.Digits;
  var twimlResponse = new twilio.TwimlResponse();
  var selectedProduct = (pressedKey === '1')? 'ProgrammableSMS':'ProgrammableVoice';
  twimlResponse.enqueue(null, function(enqueueNode) {
    enqueueNode.task('{"selected_product": "' + selectedProduct + '"}');
  });
  res.type('text/xml');
  res.send(twimlResponse.toString());
});

module.exports = router;
