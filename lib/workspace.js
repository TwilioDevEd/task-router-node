'use strict';
var twilio = require('twilio');

function buildClient() {
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;
  return new twilio.TaskRouterClient(accountSid, authToken);
}

function create(friendlyName, eventCallbackUrl) {
  var client = buildClient();
  client.workspaces.create({
        friendlyName: friendlyName,
        eventCallbackUrl: eventCallbackUrl
  });
}

module.exports.create = create;

