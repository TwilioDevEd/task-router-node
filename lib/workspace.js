'use strict';
var twilio = require('twilio');

function buildClient() {
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;
  var workspaceSid = 'not-set';
  return new twilio.TaskRouterClient(accountSid, authToken, workspaceSid);
}

function create(friendlyName, eventCallbackUrl) {
  var client = buildClient();
  return client.workspaces.create({
        friendlyName: friendlyName,
        eventCallbackUrl: eventCallbackUrl
  });
}

module.exports.create = create;

