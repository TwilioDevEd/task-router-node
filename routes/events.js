'use strict';

var express = require('express'),
  MissedCall = require('../models/call'),
  util = require('util'),
  twilio = require('twilio'),
  router = express.Router();

// POST /events
router.post('/', function (req, res) {
  var eventType = req.body.EventType;

  function saveMissedCall(){
    var taskAttributes = req.body.TaskAttributes;
    return MissedCall.create({
      selectedProduct: taskAttributes.selected_product,
      phoneNumber: taskAttributes.from
    });
  }

  var eventHandler = {};
  eventHandler['task.canceled'] = saveMissedCall;
  eventHandler['workflow.timeout'] = function() { saveMissedCall().then(voicemail('callSid')); };

  (eventHandler[eventType] || function(){})();
  res.json({});
});

function voicemail (callSid){
  var accountSid = process.env.TWILIO_ACCOUNT_SID,
      authToken = process.env.TWILIO_AUTH_TOKEN,
      voicemailAddress = process.env.MISSED_CALLS_EMAIL_ADDRESS,
      quotedMessage = 'Sorry, All agents are busy. Please leave a message. We\'ll call you as soon as possible';
  var voicemailUrl = util.format("http://twimlets.com/voicemail?Email=%s&%s", voicemailAddress, quotedMessage);
  var client = require('twilio')(accountSid, authToken);
  client.calls(callSid).update({
    method: 'POST',
    url: voicemailUrl
  });
}

module.exports = router;
