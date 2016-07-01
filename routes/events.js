'use strict';

var express = require('express'),
  MissedCall = require('../models/call'),
  util = require('util'),
  querystring = require('querystring'),
  router = express.Router();

// POST /events
router.post('/', function (req, res) {
  var eventType = req.body.EventType;
  var taskAttributes = (req.body.TaskAttributes)? JSON.parse(req.body.TaskAttributes) : {};

  function saveMissedCall(){
    return MissedCall.create({
      selectedProduct: taskAttributes.selected_product,
      phoneNumber: taskAttributes.from
    });
  }

  var eventHandler = {};
  eventHandler['task.canceled'] = saveMissedCall;
  eventHandler['workflow.timeout'] = function() { saveMissedCall().then(voicemail(taskAttributes.call_sid)); };

  (eventHandler[eventType] || function(){})();
  res.json({});
});

function voicemail (callSid){
  var accountSid = process.env.TWILIO_ACCOUNT_SID,
      authToken = process.env.TWILIO_AUTH_TOKEN,
      query = querystring.stringify({
        Message: 'Sorry, All agents are busy. Please leave a message. We\'ll call you as soon as possible',
        Email: process.env.MISSED_CALLS_EMAIL_ADDRESS}),
      voicemailUrl = util.format("http://twimlets.com/voicemail?%s", query),
      client = require('twilio')(accountSid, authToken);

  client.calls(callSid).update({
    method: 'POST',
    url: voicemailUrl
  });
}

module.exports = router;
