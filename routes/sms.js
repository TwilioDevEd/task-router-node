'use strict';

var express = require('express'),
  router = express.Router(),
  twimlGenerator = require('../lib/twiml-generator');

// POST /sms/incoming
router.post('/incoming/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.generateConfirmMessage('Idle'));
});

module.exports = router;
