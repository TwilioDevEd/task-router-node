'use strict';

var express = require('express'),
  router = express.Router();

// POST /events
router.post('/', function (req, res) {
  res.send('ok');
});

module.exports = router;
