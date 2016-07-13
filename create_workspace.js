#!/usr/bin/env node
"use strict";

var Q = require('q'),
    workspaceHelper = require('./lib/workspace'),
    wb = require('twilio/lib/resources/task_router/WorkflowBuilder');


function exitErrorHandler(error) {
  console.error('An error occurred:');
  console.error(error);
  process.exit(1);
}

var workspaceName = 'TaskRouter Node Workspace',
    host = process.env.HOST,
    eventCallback = host + '/events';

workspaceHelper.deleteByName(workspaceName).then(function(){
  return workspaceHelper.create(workspaceName, eventCallback).then(function(workspace){
    console.log('Workspace "%s" created, eventCallback is %s', workspaceName, eventCallback);

    workspace.activities.list().then(function(response){
      var idleActivity = response.activities.find(byName('Idle'));
      var busyActivity = response.activities.find(byName('Busy'));
      var reservedActivity = response.activities.find(byName('Reserved'));

      workspace.workers.create({
        friendlyName: 'Bob',
        attributes: JSON.stringify({
            "products": [
          "ProgrammableSMS"
          ],
        "contact_uri": process.env.BOB_NUMBER
          }),
        activitySid: idleActivity.sid
      }).catch(exitErrorHandler);
      workspace.workers.create({
        friendlyName: 'Alice',
        attributes: JSON.stringify({
            "products": [
          "ProgrammableVoice"
          ],
        "contact_uri": process.env.ALICE_NUMBER
          }),
        activitySid: idleActivity.sid
      }).catch(exitErrorHandler);

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
          queue: createdQueues.find(byName('Default')).sid,
            timeout: 30,
            priority: 1
        });

        var smsTarget = new wb.WorkflowRuleTarget({
          queue: createdQueues.find(byName('SMS')).sid,
            timeout: 30,
            priority: 5
        });
        var voiceTarget = new wb.WorkflowRuleTarget({
          queue: createdQueues.find(byName('Voice')).sid,
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
          console.log('Worflow "%s" created.', workflow.friendly_name);
          console.log('############################################################');
          console.log("Please export the following variables:");
          console.log("export WORKFLOW_SID=" + workflow.sid);
          console.log("export POST_WORK_ACTIVITY_SID=" + idleActivity.sid);
        }).catch(exitErrorHandler);
      }).catch(exitErrorHandler);
    });
  }).catch(exitErrorHandler);
}).catch(exitErrorHandler);

function byName(name){
  return function(item) {
    return item.friendly_name === name;
  };
}
