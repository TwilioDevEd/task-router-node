var twilio = require('twilio');
var filter = require('lodash/filter');
var map = require('lodash/map');
var difference = require('lodash/difference');
var WORKSPACE_NAME = 'TaskRouter Node Workspace';
var HOST = process.env.HOST;
var EVENT_CALLBACK = `${HOST}/events`;
var ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
var AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

module.exports = function() {
  function initWorkspace(existingWorkspaceSid) {
    if (!existingWorkspaceSid) {
      return twilio(ACCOUNT_SID, AUTH_TOKEN).taskrouter.v1.workspaces;
    }

    return twilio(ACCOUNT_SID, AUTH_TOKEN)
             .taskrouter.v1.workspaces(existingWorkspaceSid);
  }

  function createBobWorker() {
    var ctx = this;

    return this.client.activities.list({friendlyName: 'Idle'})
    .then(function(idleActivity) {
      return ctx.client.workers.create({
        friendlyName: 'Bob',
        attributes: JSON.stringify({
          'products': ['ProgrammableSMS'],
          'contact_uri': process.env.BOB_NUMBER,
        }),
        activitySid: idleActivity.sid,
      });
    });
  }

  function createAliceWorker() {
    var ctx = this;

    return this.client.activities.list({friendlyName: 'Idle'})
    .then(function(idleActivity) {
      return ctx.client.workers.create({
        friendlyName: 'Alice',
        attributes: JSON.stringify({
          'products': ['ProgrammableVoice'],
          'contact_uri': process.env.ALICE_NUMBER,
        }),
        activitySid: idleActivity.sid,
      });
    });
  }

  function createWorkflow() {
    var ctx = this;
    var config = this.createWorkflowConfig()

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
            var idleActivity = activities.find(byFriendlyName('Idle'));
            var offlineActivity = activities.find(byFriendlyName('Offline'));

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
        var busyActivity = activities.find(byFriendlyName('Busy'));
        var reservedActivity = activities
                                 .find(byFriendlyName('Reserved'));
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
    return Promise.all([ctx.createBobWorker(), ctx.createAliceWorker()])
    .then(function(workers) {
      bobWorker = workers[0];
      aliceWorker = workers[1];
      var workerInfo = {};

      workerInfo[process.env.ALICE_NUMBER] = aliceWorker.sid;
      workerInfo[process.env.BOB_NUMBER] = bobWorker.sid;

      return workerInfo;
    });
  }

  function createWorkflowActivities() {
    var ctx = this;
    var activityNames = ['Idle', 'Busy', 'Offline', 'Reserved']

    return ctx.client.activities.list()
      .then(function(activities) {
        existingActivities = map(activities, 'friendlyName')

        var missingActivities = difference(activityNames, existingActivities);

        var tasks = [];

        missingActivities.forEach(function(friendlyName) {
          tasks.push((function() {
            return ctx.client.activities
              .create({
                friendlyName: friendlyName,
                available: 'true'
              });
          })());
        });

        return Promise.all(tasks)
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
      queue: queues.find(byFriendlyName('Default')).sid,
      timeout: 30,
      priority: 1,
    };

    var smsTarget = {
      queue: queues.find(byFriendlyName('SMS')).sid,
      timeout: 30,
      priority: 5,
    };

    var voiceTarget = {
      queue: queues.find(byFriendlyName('Voice')).sid,
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

  function initClient() {
    var ctx = this;

    return ctx.createClient()
      .then(function(client) {
        ctx.client = client;
      });
  }

  function setup() {
    var ctx = this;

    return this.initClient()
      .then(createWorkflowActivities.bind(ctx))
      .then(createTaskQueues.bind(ctx))
      .then(createWorkflow.bind(ctx))
      .then(function(workspaceInfo) {
        return ctx.createWorkers()
        .then(function(workerInfo) {
          return [workerInfo, workspaceInfo];
        });
      })
  }

  function byFriendlyName(name) {
    return function(item) {
      return item.friendlyName === name;
    };
  }

  function findByFriendlyName(friendlyName) {
    var client = this.client || this.initWorkspace();

    return client.list().then(function (data){
      return data.find(byFriendlyName(friendlyName));
    });
  }

  function deleteByFriendlyName(friendlyName) {
    var ctx = this;

    return this.findByFriendlyName(friendlyName)
      .then(function (workspace) {
        if (workspace) {
          var client = ctx.initWorkspace(workspace.sid);
          return client.remove();
        }
      });
  }

  function createWorkspace() {
    var client = initWorkspace();

    return client.create({
      friendlyName: WORKSPACE_NAME,
      EVENT_CALLBACKUrl: EVENT_CALLBACK
    })
  }

  function createClient() {
    var ctx = this;
    var client = this.initWorkspace();

    return this.findByFriendlyName(WORKSPACE_NAME)
      .then(function(workspace) {
        var client;
        var task;

        if (workspace) {
          task = ctx.deleteByFriendlyName(WORKSPACE_NAME)
                   .then(ctx.createWorkspace);
        } else {
          task = ctx.createWorkspace();
        }

        return task;
      })
      .then(function(workspace) {
        return ctx.initWorkspace(workspace.sid);
      });
  }

  return {
    createAliceWorker: createAliceWorker,
    createBobWorker: createBobWorker,
    createClient: createClient,
    createTaskQueues: createTaskQueues,
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
  }
}
