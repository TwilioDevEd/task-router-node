'use strict';
var twilio = require('twilio');

function buildClient() {
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;
  var workspaceSid = 'not-set';
  return new twilio.TaskRouterClient(accountSid, authToken, workspaceSid);
}

function findByName(friendlyName) {
  var client = buildClient();
  return client.workspaces.list().then(function (data){
    function byName(workspace) {
      return workspace.friendly_name === friendlyName;
    }
    return data.workspaces.find(byName);
  });
}

function create(friendlyName, eventCallbackUrl) {
  var client = buildClient();
  return client.workspaces.create({
        friendlyName: friendlyName,
        eventCallbackUrl: eventCallbackUrl
  });
}

module.exports.create = create;
module.exports.findByName = findByName;
