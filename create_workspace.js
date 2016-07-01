#!/usr/bin/env node
"use strict";

var program   = require('commander'),
    Q = require('q'),
    workspaceHelper = require('./lib/workspace'),
    util = require('util'),
    wb = require('twilio/lib/resources/task_router/WorkflowBuilder'),
    fs = require('fs');

var hostValue, phoneNumbers;

program
  .version('0.0.1')
  .arguments('<host> <bob_number> <alice_number>')
  .description('Creates and configures a Twilio\'s TaskRouter Workspace.')
  .action(function (host, bobNumber, aliceNumber){
    hostValue        = host;
    phoneNumbers = {
      Bob: bobNumber,
      Alice: aliceNumber
    };
  });

program.parse(process.argv);

if(!hostValue || !phoneNumbers){
  program.outputHelp();
  process.exit(1);
}

function exitErrorHandler(error) {
  console.error('An error occurred:');
  console.error(error);
  process.exit(1);
}

var workspaceJson = JSON.parse(fs.readFileSync('workspace.json', 'utf8'));

workspaceHelper.deleteByName(workspaceJson.name).then(function(){
  var eventCallback = util.format(workspaceJson.event_callback, hostValue);
  return workspaceHelper.create(workspaceJson.name, eventCallback).then(function(workspace){
    console.log('Workspace "%s" created, eventCallback is %s', workspaceJson.name, eventCallback);

    workspace.activities.list().then(function(response){
      var idleActivity = response.activities.find(byName('Idle'));
      var busyActivity = response.activities.find(byName('Busy'));
      var reservedActivity = response.activities.find(byName('Reserved'));

      workspaceJson.workers.forEach(function (workerJson) {
        var workerAttributes = util.format(JSON.stringify(workerJson.attributes), phoneNumbers[workerJson.name]);
        console.log('Creating worker %s with attributes %s', workerJson.name, workerAttributes);
        workspace.workers.create({
          friendlyName: workerJson.name,
          attributes: workerAttributes,
          activitySid: idleActivity.sid
        }).catch(exitErrorHandler);
      });

      Q.all(workspaceJson.task_queues.map(function(taskQueueJson){
        return workspace.taskQueues.create({
          friendlyName: taskQueueJson.name,
          targetWorkers: taskQueueJson.targetWorkers,
          assignmentActivitySid: busyActivity.sid,
          reservationActivitySid: reservedActivity.sid
        }).then(function(taskQueue){
          console.log('"%s" Task Queue created, using expression "%s".', taskQueue.friendly_name, taskQueue.target_workers);
          return taskQueue;
        });
      })).then(function(createdQueues){
        var rules = workspaceJson.workflow.routingConfiguration.map(function(configJson){
          var target = new wb.WorkflowRuleTarget({
            queue: createdQueues.find(byName(configJson.targetTaskQueue)).sid
          });
          return new wb.WorkflowRule({
            expression: configJson.expression,
            targets: [target]
          });
        });

        var defaultTarget = new wb.WorkflowRuleTarget({
          queue: createdQueues.find(byName('Default')).sid
        });

        var taskRouting = new wb.TaskRoutingConfiguration({
          filters : rules,
          default_filter : defaultTarget
        });
        var workflowConfiguration = new wb.WorkflowConfiguration({
          taskRouting: taskRouting
        }).toJSON();

        workspace.workflows.create({
          friendlyName: workspaceJson.workflow.name,
          assignmentCallbackUrl: util.format(workspaceJson.workflow.callback, hostValue),
          fallbackAssignmentCallbackUrl: util.format(workspaceJson.workflow.callback, hostValue),
          taskReservationTimeout: workspaceJson.workflow.timeout,
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
