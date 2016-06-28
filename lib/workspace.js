'use strict';
var twilio = require('twilio');

function buildClient(existingWorkspaceSid) {
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;
  var workspaceSid = existingWorkspaceSid || 'not-set';
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

function deleteByName(friendlyName) {
  return findByName(friendlyName).then(function (workspace) {
    if (workspace){
      console.log('Deleting: ' + workspace.sid);
      var client = buildClient(workspace.sid);
      return client.workspace.delete();
    }
  });
}

function create(friendlyName, eventCallbackUrl) {
  var client = buildClient();
  return client.workspaces.create({
        friendlyName: friendlyName,
        eventCallbackUrl: eventCallbackUrl
  }).then(function(workspace){
    return buildClient(workspace.sid).workspace;
  });
}

module.exports = {
  create: create,
  findByName: findByName,
  deleteByName: deleteByName
};
