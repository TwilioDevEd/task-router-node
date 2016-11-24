'use strict';

var mongoose = require('mongoose');

var MissedCall = new mongoose.Schema({
  selectedProduct: String,
  phoneNumber: String
});

delete mongoose.models.MissedCall;

module.exports = mongoose.model('MissedCall', MissedCall);
