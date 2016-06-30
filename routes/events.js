'use strict';

var express = require('express'),
  MissedCall = require('../models/call'),
  router = express.Router();

// POST /events
router.post('/', function (req, res) {
  var eventType = req.body.EventType;

  function saveMissedCall(){
    var taskAttributes = req.body.TaskAttributes;
    MissedCall.create({
      selectedProduct: taskAttributes.selected_product,
      phoneNumber: taskAttributes.from
    }, function(err, missedCall) {
      res.json(missedCall);
    });
  }

  var eventHandler = {};
  eventHandler['task.canceled'] = saveMissedCall;
  eventHandler['default'] = function() { res.json({}); };

  (eventHandler[eventType] || eventHandler['default'])();
});

module.exports = router;
