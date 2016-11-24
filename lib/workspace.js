'use strict';

var twilio = require('twilio');
var find = require('lodash/find');
var map = require('lodash/map');
var difference = require('lodash/difference');
var WORKSPACE_NAME = 'TaskRouter Node Workspace';
var HOST = process.env.HOST;
var EVENT_CALLBACK = `${HOST}/events`;
var ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

module.exports = function() {
  function initClient(existingWorkspaceSid) {
    if (!existingWorkspaceSid) {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN).taskrouter.v1.workspaces;
    } else {
      this.client = twilio(ACCOUNT_SID, AUTH_TOKEN)
      .taskrouter.v1.workspaces(existingWorkspaceSid);
    }
  }

  function createWorker(opts) {
    var ctx = this;

    return this.client.activities.list({friendlyName: 'Idle'})
    .then(function(idleActivity) {
      return ctx.client.workers.create({
        friendlyName: opts.name,
        attributes: JSON.stringify({
          'products': opts.products,
          'contact_uri': opts.phoneNumber,
        }),
        activitySid: idleActivity.sid,
      });
    });
  }

  function createWorkflow() {
    var ctx = this;
    var config = this.createWorkflowConfig();

    return ctx.client.workflows
      .create({
        friendlyName: 'Sales',
        assignmentCallbackUrl: HOST + '/call/assignment',
        fallbackAssignmentCallbackUrl: HOST + '/call/assignment',
        taskReservationTimeout: 15,
        configuration: config,
      })
      .then(function(workflow) {
        return ctx.client.activities.list()
          .then(function(activities) {
            var idleActivity = find(activities, {friendlyName: 'Idle'});
            var offlineActivity = find(activities, {friendlyName: 'Offline'});

            return {
              workflowSid: workflow.sid,
              activities: {
                idle: idleActivity.sid,
                offline: offlineActivity.sid,
              },
              workspaceSid: ctx.client._solution.sid,
            };
          });
      });
  }

  function createTaskQueues() {
    var ctx = this;
    return this.client.activities.list()
      .then(function(activities) {
        var busyActivity = find(activities, {friendlyName: 'Busy'});
        var reservedActivity = find(activities, {friendlyName: 'Reserved'});

        return Promise.all([
          ctx.client.taskQueues.create({
            friendlyName: 'SMS',
            targetWorkers: 'products HAS "ProgrammableSMS"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Voice',
            targetWorkers: 'products HAS "ProgrammableVoice"',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
          ctx.client.taskQueues.create({
            friendlyName: 'Default',
            targetWorkers: '1==1',
            assignmentActivitySid: busyActivity.sid,
            reservationActivitySid: reservedActivity.sid,
          }),
        ])
        .then(function(queues) {
          ctx.queues = queues;
        });
      });
  }

  function createWorkers() {
    var ctx = this;

    return Promise.all([
      ctx.createWorker({
        name: 'Bob',
        phoneNumber: process.env.BOB_NUMBER,
        products: ['ProgrammableSMS'],
      }),
      ctx.createWorker({
        name: 'Alice',
        phoneNumber: process.env.ALICE_NUMBER,
        products: ['ProgrammableVoice'],
      })
    ])
    .then(function(workers) {
      var bobWorker = workers[0];
      var aliceWorker = workers[1];
      var workerInfo = {};

      workerInfo[process.env.ALICE_NUMBER] = aliceWorker.sid;
      workerInfo[process.env.BOB_NUMBER] = bobWorker.sid;

      return workerInfo;
    });
  }

  function createWorkflowActivities() {
    var ctx = this;
    var activityNames = ['Idle', 'Busy', 'Offline', 'Reserved'];

    return ctx.client.activities.list()
      .then(function(activities) {
        var existingActivities = map(activities, 'friendlyName');

        var missingActivities = difference(activityNames, existingActivities);

        var newActivities = map(missingActivities, function(friendlyName) {
          return ctx.client.activities
            .create({
              friendlyName: friendlyName,
              available: 'true'
            });
        });

        return Promise.all(newActivities);
      })
      .then(function() {
        return ctx.client.activities.list();
      });
  }

  function createWorkflowConfig() {
    var queues = this.queues;

    if (!queues) {
      throw new Error('Queues must be initialized.');
    }

    var defaultTarget = {
      queue: find(queues, {friendlyName: 'Default'}).sid,
      timeout: 30,
      priority: 1,
    };

    var smsTarget = {
      queue: find(queues, {friendlyName: 'SMS'}).sid,
      timeout: 30,
      priority: 5,
    };

    var voiceTarget = {
      queue: find(queues, {friendlyName: 'Voice'}).sid,
      timeout: 30,
      priority: 5,
    };

    var rules = [
      {
        expression: 'selected_product=="ProgrammableSMS"',
        targets: [smsTarget, defaultTarget],
        timeout: 30,
      },
      {
        expression: 'selected_product=="ProgrammableVoice"',
        targets: [voiceTarget, defaultTarget],
        timeout: 30,
      },
    ];

    var config = {
      task_routing: {
        filters: rules,
        default_filter: defaultTarget,
      },
    };

    return JSON.stringify(config);
  }

  function setup() {
    var ctx = this;

    ctx.initClient();

    return this.initWorkspace()
      .then(createWorkflowActivities.bind(ctx))
      .then(createTaskQueues.bind(ctx))
      .then(createWorkflow.bind(ctx))
      .then(function(workspaceInfo) {
        return ctx.createWorkers()
        .then(function(workerInfo) {
          return [workerInfo, workspaceInfo];
        });
      });
  }

  function findByFriendlyName(friendlyName) {
    var client = this.client;

    return client.list()
      .then(function (data) {
        return find(data, {friendlyName: friendlyName});
      });
  }

  function deleteByFriendlyName(friendlyName) {
    var ctx = this;

    return this.findByFriendlyName(friendlyName)
      .then(function(workspace) {
        if (workspace.remove) {
          return workspace.remove();
        }
      });
  }

  function createWorkspace() {
    return this.client.create({
      friendlyName: WORKSPACE_NAME,
      EVENT_CALLBACKUrl: EVENT_CALLBACK,
    });
  }

  function initWorkspace() {
    var ctx = this;
    var client = this.client;

    return ctx.findByFriendlyName(WORKSPACE_NAME)
      .then(function(workspace) {
        var newWorkspace;

        if (workspace) {
         newWorkspace = ctx.deleteByFriendlyName(WORKSPACE_NAME)
                   .then(createWorkspace.bind(ctx));
        } else {
         newWorkspace = ctx.createWorkspace();
        }

        return newWorkspace;
      })
      .then(function(workspace) {
        ctx.initClient(workspace.sid);

        return workspace;
      });
  }

  return {
    createTaskQueues: createTaskQueues,
    createWorker: createWorker,
    createWorkers: createWorkers,
    createWorkflow: createWorkflow,
    createWorkflowActivities: createWorkflowActivities,
    createWorkflowConfig: createWorkflowConfig,
    createWorkspace: createWorkspace,
    deleteByFriendlyName: deleteByFriendlyName,
    findByFriendlyName: findByFriendlyName,
    initClient: initClient,
    initWorkspace: initWorkspace,
    setup: setup,
  };
};
