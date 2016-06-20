'use strict';

var express = require('express'),
  router = express.Router(),
  twimlGenerator = require('../lib/twiml-generator');

// POST /conference/wait
router.post('/wait/', function (req, res) {
  res.type('text/xml');
  res.send(twimlGenerator.waitResponseTwiml().toString());
});

module.exports = router;
