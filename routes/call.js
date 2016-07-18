'use strict';

var express = require('express'),
    router = express.Router(),
    twilio = require('twilio');

module.exports = function (app) {
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
    var selectedProduct = (pressedKey === '1') ? 'ProgrammableSMS' : 'ProgrammableVoice';
    twimlResponse.enqueue({
      workflowSid: app.get('workspaceInfo').workflowSid
    }, function(enqueueNode) {
      enqueueNode.task('{"selected_product": "' + selectedProduct + '"}');
    });

    res.type('text/xml');
    res.send(twimlResponse.toString());
  });

  // POST /call/assignment
  router.post('/assignment/', function (req, res) {
    res.type('application/json');
    res.send({
      instruction: "dequeue",
      post_work_activity_sid: app.get('workspaceInfo').activities.idle
    });
  });

  return router;
};
