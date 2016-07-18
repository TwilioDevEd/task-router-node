'use strict';

var express = require('express'),
  MissedCall = require('../models/missed-call'),
  util = require('util'),
  querystring = require('querystring'),
  router = express.Router(),
  Q = require('q');

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

  var eventHandler = {
    'task.canceled': saveMissedCall,
    'workflow.timeout': function() {
      return saveMissedCall().then(voicemail(taskAttributes.call_sid));
    },
    'worker.activity.update': function(){
      var workerAttributes = JSON.parse(req.body.WorkerAttributes);
      if (req.body.WorkerActivityName === 'Offline') {
        notifyOfflineStatus(workerAttributes.contact_uri);
      }
      return Q.resolve({});
    },
    'default': function() { return Q.resolve({}); }
  };

  (eventHandler[eventType] || eventHandler['default'])().then(function () {
    res.json({});
  });
});

function voicemail (callSid){
  var client = buildClient(),
      query = querystring.stringify({
        Message: 'Sorry, All agents are busy. Please leave a message. We\'ll call you as soon as possible',
        Email: process.env.MISSED_CALLS_EMAIL_ADDRESS}),
      voicemailUrl = util.format("http://twimlets.com/voicemail?%s", query);

  client.calls(callSid).update({
    method: 'POST',
    url: voicemailUrl
  });
}

function notifyOfflineStatus(phone_number) {
  var client = buildClient(),
      message = 'Your status has changed to Offline. Reply with "On" to get back Online';
  client.sendMessage({
    to: phone_number,
    from: process.env.TWILIO_NUMBER,
    body: message
  });
}

function buildClient() {
  var accountSid = process.env.TWILIO_ACCOUNT_SID,
      authToken = process.env.TWILIO_AUTH_TOKEN;
  return require('twilio')(accountSid, authToken);
}

module.exports = router;
