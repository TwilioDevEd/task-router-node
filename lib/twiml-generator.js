'use strict';

var twilio = require('twilio');

var generateConfirmMessage = function(statusName){
  var response = new twilio.TwimlResponse();
  response.say('Your status has changed to ' + statusName);
  return response.toString();
};

module.exports.generateConfirmMessage = generateConfirmMessage;
