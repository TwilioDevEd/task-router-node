'use strict';
var twilio = require('twilio'),
  wb = require('twilio/lib/resources/task_router/WorkflowBuilder'),
  Q = require('q');

function buildClient(existingWorkspaceSid) {
  var accountSid = process.env.TWILIO_ACCOUNT_SID;
  var authToken = process.env.TWILIO_AUTH_TOKEN;
  var workspaceSid = existingWorkspaceSid || 'not-set';
  return new twilio.TaskRouterClient(accountSid, authToken, workspaceSid);
}


function setup(errorHandler) {
  var workflowDeferred = Q.defer(),
    workerDeferred = Q.defer(),
    workspaceName = 'TaskRouter Node Workspace',
    host = process.env.HOST,
    eventCallback = host + '/events';

  deleteByName(workspaceName).then(function(){
    return create(workspaceName, eventCallback).then(function(client){
      var workspace = client.workspace;

      workspace.activities.list().then(function(response){
        var idleActivity = response.activities.find(byFriendlyName('Idle'));
        var offlineActivity = response.activities.find(byFriendlyName('Offline'));
        var busyActivity = response.activities.find(byFriendlyName('Busy'));
        var reservedActivity = response.activities.find(byFriendlyName('Reserved'));

        workspace.workers.create({
          friendlyName: 'Bob',
          attributes: JSON.stringify({
            "products": [ "ProgrammableSMS" ],
            "contact_uri": process.env.BOB_NUMBER
          }),
          activitySid: idleActivity.sid
        }).then(function (bobWorker) {
          workspace.workers.create({
            friendlyName: 'Alice',
            attributes: JSON.stringify({
              "products": [ "ProgrammableVoice" ],
              "contact_uri": process.env.ALICE_NUMBER
            }),
            activitySid: idleActivity.sid
          }).then(function (aliceWorker) {
            var workerInfo = {};
            workerInfo[process.env.ALICE_NUMBER] = aliceWorker.sid;
            workerInfo[process.env.BOB_NUMBER] = bobWorker.sid;
            workerDeferred.resolve(workerInfo);
          }).catch(errorHandler);
        }).catch(errorHandler);

        Q.all([workspace.taskQueues.create({
          friendlyName: 'SMS',
          targetWorkers: 'products HAS "ProgrammableSMS"',
          assignmentActivitySid: busyActivity.sid,
          reservationActivitySid: reservedActivity.sid
        }), workspace.taskQueues.create({
          friendlyName: 'Voice',
          targetWorkers: 'products HAS "ProgrammableVoice"',
          assignmentActivitySid: busyActivity.sid,
          reservationActivitySid: reservedActivity.sid
        }), workspace.taskQueues.create({
          friendlyName: 'Default',
          targetWorkers: '1==1',
          assignmentActivitySid: busyActivity.sid,
          reservationActivitySid: reservedActivity.sid
        })]).then(function (createdQueues) {
          var defaultTarget = new wb.WorkflowRuleTarget({
            queue: createdQueues.find(byFriendlyName('Default')).sid,
            timeout: 30,
            priority: 1
          });

          var smsTarget = new wb.WorkflowRuleTarget({
            queue: createdQueues.find(byFriendlyName('SMS')).sid,
            timeout: 30,
            priority: 5
          });
          var voiceTarget = new wb.WorkflowRuleTarget({
            queue: createdQueues.find(byFriendlyName('Voice')).sid,
            timeout: 30,
            priority: 5
          });

          var rules = [
            new wb.WorkflowRule({
              expression: 'selected_product=="ProgrammableSMS"',
              targets: [smsTarget, defaultTarget],
              timeout: 30
            }),
            new wb.WorkflowRule({
              expression: 'selected_product=="ProgrammableVoice"',
              targets: [voiceTarget, defaultTarget],
              timeout: 30
            }),
          ];

          var taskRouting = new wb.TaskRoutingConfiguration({
            filters : rules,
            default_filter : defaultTarget
          });
          var workflowConfiguration = new wb.WorkflowConfiguration({
            taskRouting: taskRouting
          }).toJSON();

          workspace.workflows.create({
            friendlyName: 'Sales',
            assignmentCallbackUrl: host + '/call/assignment',
            fallbackAssignmentCallbackUrl: host + '/call/assignment',
            taskReservationTimeout: 15,
            configuration: workflowConfiguration
          }).then(function(workflow){
            workflowDeferred.resolve({
              workflowSid: workflow.sid,
              activities: {
                idle: idleActivity.sid,
                offline: offlineActivity.sid
              },
              workspaceSid: client.workspaceSid
            });
          }).catch(errorHandler);
        }).catch(errorHandler);
      });
    }).catch(errorHandler);
  }).catch(errorHandler);
  return Q.all([workerDeferred.promise, workflowDeferred.promise]);
}

function byFriendlyName(name){
  return function(item) {
    return item.friendly_name === name;
  };
}

function findByName(friendlyName) {
  var client = buildClient();
  return client.workspaces.list().then(function (data){
    return data.workspaces.find(byFriendlyName(friendlyName));
  });
}

function deleteByName(friendlyName) {
  return findByName(friendlyName).then(function (workspace) {
    if (workspace){
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
    return buildClient(workspace.sid);
  });
}

module.exports = {
  create: create,
  findByName: findByName,
  deleteByName: deleteByName,
  setup: setup
};
