'use strict';

var MessagingResponse = require('twilio/lib/twiml/MessagingResponse');

var generateConfirmMessage = function(statusName){
  var response = new MessagingResponse();
  response.message('Your status has changed to ' + statusName);
  return response.toString();
};

module.exports.generateConfirmMessage = generateConfirmMessage;
