'use strict';

var mongoose = require('mongoose');

var MissedCall = new mongoose.Schema({
  selectedProduct: String,
  phoneNumber: String
});

module.exports = mongoose.model('missedCall', MissedCall);
