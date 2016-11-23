'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var vcr = require('nock-vcr-recorder-mocha');
var sinon = require('sinon');
var decache = require('decache');
var reduce = require('lodash/reduce');

// vcr.config({mode: 'all'})

nock.enableNetConnect();
// nock.disableNetConnect()

// add sinon-promise
require('sinon-promise')(sinon);

var WORKSPACE_NAME = 'TaskRouter Node Workspace';
var workspace;

function createWorkspaceReq() {
  return nock('https://taskrouter.twilio.com')
    .post(/\/v1\/Workspaces$/)
    .reply(201, {
       "sid":"WS42149b2ca185e6c4e5629e17ae4a7a0a",
       "account_sid":"TWILIO_ACCOUNT_SID",
       "friendly_name":"TaskRouter Node Workspace",
       "event_callback_url":"",
       "default_activity_sid":"WAddff945eb26eef6200dba2e156091bdc",
       "date_created":"2016-11-22T15:35:17Z",
       "date_updated":"2016-11-22T15:35:17Z",
       "default_activity_name":"Offline",
       "timeout_activity_sid":"WAddff945eb26eef6200dba2e156091bdc",
       "timeout_activity_name":"Offline",
       "events_filter":null,
       "multi_task_enabled":false,
       "prioritize_queue_order":"FIFO",
       "url":"https://taskrouter.twilio.com/v1/Workspaces/WS42149b2ca185e6c4e5629e17ae4a7a0a",
       "links":{
          "activities":"https://taskrouter.twilio.com/v1/Workspaces/WS42149b2ca185e6c4e5629e17ae4a7a0a/Activities",
          "task_queues":"https://taskrouter.twilio.com/v1/Workspaces/WS42149b2ca185e6c4e5629e17ae4a7a0a/TaskQueues",
          "statistics":"https://taskrouter.twilio.com/v1/Workspaces/WS42149b2ca185e6c4e5629e17ae4a7a0a/Statistics",
          "tasks":"https://taskrouter.twilio.com/v1/Workspaces/WS42149b2ca185e6c4e5629e17ae4a7a0a/Tasks",
          "workers":"https://taskrouter.twilio.com/v1/Workspaces/WS42149b2ca185e6c4e5629e17ae4a7a0a/Workers",
          "workflows":"https://taskrouter.twilio.com/v1/Workspaces/WS42149b2ca185e6c4e5629e17ae4a7a0a/Workflows",
          "task_channels":"https://taskrouter.twilio.com/v1/Workspaces/WS42149b2ca185e6c4e5629e17ae4a7a0a/TaskChannels"
       }
    });
}

function getWorkspacesReq() {
  return nock('https://taskrouter.twilio.com')
  .get(/Workspaces$/)
  .reply(200, {
     "meta":{
        "page":0,
        "page_size":50,
        "first_page_url":"https://taskrouter.twilio.com/v1/Workspaces?PageSize=50&Page=0",
        "previous_page_url":null,
        "url":"https://taskrouter.twilio.com/v1/Workspaces?PageSize=50&Page=0",
        "next_page_url":null,
        "key":"workspaces"
     },
     "workspaces":[
        {
           "sid":"WS2d310000fbbcbb973de078dd95a60ca1",
           "account_sid":"TWILIO_ACCOUNT_SID",
           "friendly_name":"TaskRouter Node Workspace",
           "event_callback_url":"",
           "default_activity_sid":"WA6ded316c70ea42a5d51f14a1af4fe1c5",
           "date_created":"2016-11-22T15:34:11Z",
           "date_updated":"2016-11-22T15:34:11Z",
           "default_activity_name":"Offline",
           "timeout_activity_sid":"WA6ded316c70ea42a5d51f14a1af4fe1c5",
           "timeout_activity_name":"Offline",
           "events_filter":null,
           "multi_task_enabled":false,
           "prioritize_queue_order":"FIFO",
           "url":"https://taskrouter.twilio.com/v1/Workspaces/WS2d310000fbbcbb973de078dd95a60ca1",
           "links":{
              "activities":"https://taskrouter.twilio.com/v1/Workspaces/WS2d310000fbbcbb973de078dd95a60ca1/Activities",
              "task_queues":"https://taskrouter.twilio.com/v1/Workspaces/WS2d310000fbbcbb973de078dd95a60ca1/TaskQueues",
              "statistics":"https://taskrouter.twilio.com/v1/Workspaces/WS2d310000fbbcbb973de078dd95a60ca1/Statistics",
              "tasks":"https://taskrouter.twilio.com/v1/Workspaces/WS2d310000fbbcbb973de078dd95a60ca1/Tasks",
              "workers":"https://taskrouter.twilio.com/v1/Workspaces/WS2d310000fbbcbb973de078dd95a60ca1/Workers",
              "workflows":"https://taskrouter.twilio.com/v1/Workspaces/WS2d310000fbbcbb973de078dd95a60ca1/Workflows",
              "task_channels":"https://taskrouter.twilio.com/v1/Workspaces/WS2d310000fbbcbb973de078dd95a60ca1/TaskChannels"
           }
        }
     ]
  });
}

function createWorkerReq() {
  return nock('https://taskrouter.twilio.com')
    .post(/\/Workspaces\/.*\/Workers/)
    .reply(201, {
      "sid":"WKebbe138eec2803281562e04bde385385",
      "friendly_name":"Bob",
      "account_sid":"account_sid",
      "activity_sid":"WAc25d357db789df55d316bd19c98c0ef4",
      "activity_name":"Offline",
      "workspace_sid":"WS454226a113c29fad465499dfcaca7aa8",
      "attributes":"{\"contact_uri\":\"+5213321678083\",\"products\":[\"ProgrammableSMS\"]}",
      "available":false,
      "date_created":"2016-11-22T16:47:39Z",
      "date_updated":"2016-11-22T16:47:39Z",
      "date_status_changed":"2016-11-22T16:47:39Z",
      "url":"https://taskrouter.twilio.com/v1/Workspaces/WS454226a113c29fad465499dfcaca7aa8/Workers/WKebbe138eec2803281562e04bde385385",
      "links":{
         "channels":"https://taskrouter.twilio.com/v1/Workspaces/WS454226a113c29fad465499dfcaca7aa8/Workers/WKebbe138eec2803281562e04bde385385/Channels",
         "activity":"https://taskrouter.twilio.com/v1/Workspaces/WS454226a113c29fad465499dfcaca7aa8/Activities/WAc25d357db789df55d316bd19c98c0ef4",
         "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WS454226a113c29fad465499dfcaca7aa8"
      }
    });
}
function deleteWorkspaceReq() {
  return nock('https://taskrouter.twilio.com')
  .delete(/\/v1\/Workspaces\/.{34}$/)
  .reply(204, '');
}

function getActivitiesReq() {
  return nock('https://taskrouter.twilio.com')
    .get(/\/Workspaces\/.*\/Activities/)
    .reply(200, {
       "activities":[
          {
             "sid":"WA232cee832f47b5395ab3d3727cb0c8fa",
             "account_sid":"account_sid",
             "workspace_sid":"WSc70ebdb3f070d2ba76044827b2aa9371",
             "friendly_name":"Offline",
             "available":false,
             "date_created":"2016-11-22T19:34:33Z",
             "date_updated":"2016-11-22T19:34:33Z",
             "url":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371/Activities/WA232cee832f47b5395ab3d3727cb0c8fa",
             "links":{
                "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371"
             }
          },
          {
             "sid":"WAe6a6b7b51c4921daa1b46c081aca6632",
             "account_sid":"account_sid",
             "workspace_sid":"WSc70ebdb3f070d2ba76044827b2aa9371",
             "friendly_name":"Idle",
             "available":true,
             "date_created":"2016-11-22T19:34:33Z",
             "date_updated":"2016-11-22T19:34:33Z",
             "url":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371/Activities/WAe6a6b7b51c4921daa1b46c081aca6632",
             "links":{
                "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371"
             }
          },
          {
             "sid":"WAbab4f2f8e0a8b59a9664a860484ca99e",
             "account_sid":"account_sid",
             "workspace_sid":"WSc70ebdb3f070d2ba76044827b2aa9371",
             "friendly_name":"Busy",
             "available":false,
             "date_created":"2016-11-22T19:34:33Z",
             "date_updated":"2016-11-22T19:34:33Z",
             "url":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371/Activities/WAbab4f2f8e0a8b59a9664a860484ca99e",
             "links":{
                "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371"
             }
          },
          {
             "sid":"WA6a192463864b72aa9b073512c88316b4",
             "account_sid":"account_sid",
             "workspace_sid":"WSc70ebdb3f070d2ba76044827b2aa9371",
             "friendly_name":"Reserved",
             "available":false,
             "date_created":"2016-11-22T19:34:33Z",
             "date_updated":"2016-11-22T19:34:33Z",
             "url":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371/Activities/WA6a192463864b72aa9b073512c88316b4",
             "links":{
                "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371"
             }
          }
       ],
       "meta":{
          "page":0,
          "page_size":50,
          "first_page_url":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371/Activities?PageSize=50&Page=0",
          "previous_page_url":null,
          "url":"https://taskrouter.twilio.com/v1/Workspaces/WSc70ebdb3f070d2ba76044827b2aa9371/Activities?PageSize=50&Page=0",
          "next_page_url":null,
          "key":"activities"
       }
    });
}

function createActivitiesReq() {
  return nock('https://taskrouter.twilio.com')
    .post(/\/Workspaces\/.*\/Activities/)
    .reply(200, {
       "activities":[
          {
             "sid":"WA387c6f326576e2971d0691cdf111abce",
             "account_sid":"account_sid",
             "workspace_sid":"WS9328cf0c40e2d8d6e404d6ac957f6916",
             "friendly_name":"Offline",
             "available":false,
             "date_created":"2016-11-22T19:08:53Z",
             "date_updated":"2016-11-22T19:08:53Z",
             "url":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916/Activities/WA387c6f326576e2971d0691cdf111abce",
             "links":{
                "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916"
             }
          },
          {
             "sid":"WAb9e1cc62cfd8761ce3ec453c04e8d734",
             "account_sid":"account_sid",
             "workspace_sid":"WS9328cf0c40e2d8d6e404d6ac957f6916",
             "friendly_name":"Idle",
             "available":true,
             "date_created":"2016-11-22T19:08:53Z",
             "date_updated":"2016-11-22T19:08:53Z",
             "url":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916/Activities/WAb9e1cc62cfd8761ce3ec453c04e8d734",
             "links":{
                "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916"
             }
          },
          {
             "sid":"WA8bb91823d522b66c55bd09ee7fef645e",
             "account_sid":"account_sid",
             "workspace_sid":"WS9328cf0c40e2d8d6e404d6ac957f6916",
             "friendly_name":"Busy",
             "available":false,
             "date_created":"2016-11-22T19:08:53Z",
             "date_updated":"2016-11-22T19:08:53Z",
             "url":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916/Activities/WA8bb91823d522b66c55bd09ee7fef645e",
             "links":{
                "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916"
             }
          },
          {
             "sid":"WA749c464806cd2c1480afcbd75a216fda",
             "account_sid":"account_sid",
             "workspace_sid":"WS9328cf0c40e2d8d6e404d6ac957f6916",
             "friendly_name":"Reserved",
             "available":false,
             "date_created":"2016-11-22T19:08:53Z",
             "date_updated":"2016-11-22T19:08:53Z",
             "url":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916/Activities/WA749c464806cd2c1480afcbd75a216fda",
             "links":{
                "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916"
             }
          }
       ],
       "meta":{
          "page":0,
          "page_size":50,
          "first_page_url":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916/Activities?PageSize=50&Page=0",
          "previous_page_url":null,
          "url":"https://taskrouter.twilio.com/v1/Workspaces/WS9328cf0c40e2d8d6e404d6ac957f6916/Activities?PageSize=50&Page=0",
          "next_page_url":null,
          "key":"activities"
       }
    });
}

function createTaskQueueReq() {
  return nock('https://taskrouter.twilio.com')
    .post(/\/Workspaces\/.*\/TaskQueues/)
    .reply(201, function(uri, body) {
      var workspace_sid = uri.match(/Workspaces\/(.*)\/TaskQueues/);
      var pairs = body.match(/name\=\"([a-zA-Z0-9]*)\"\s{4}(.*)/g);

      var newPairs = pairs.map(function(pairStr) {
        var match = pairStr.match(/name\=\"([a-zA-Z0-9]*)\"\s{4}(.*)/)
        var result = {};

        result[match[1]] = match[2];

        return result;
      });

      var newBody = reduce(newPairs, function(result, value) {
        return Object.assign(result, value);
      }, {});

      return {
         "sid":"WQ1919e76f4c73b6c056818ad95ac8dbe2",
         "account_sid":"account_sid",
         "workspace_sid": workspace_sid,
         "friendly_name": newBody.FriendlyName,
         "target_workers": newBody.targetWorkers,
         "max_reserved_workers":1,
         "reservation_activity_sid":newBody.ReservationActivitySid,
         "reservation_activity_name":"Reserved",
         "assignment_activity_sid":newBody.AssignmentActivitySid,
         "assignment_activity_name":"Busy",
         "task_order":"FIFO",
         "date_created":"2016-11-22T19:36:58Z",
         "date_updated":"2016-11-22T19:36:58Z",
         "url":"https://taskrouter.twilio.com/v1/Workspaces/WS839a1163b2a7fd63eb41bee2d96fcc77/TaskQueues/WQ1919e76f4c73b6c056818ad95ac8dbe2",
         "links":{
            "assignment_activity":"https://taskrouter.twilio.com/v1/Workspaces/WS839a1163b2a7fd63eb41bee2d96fcc77/Activities/WAcf4ae3a82c418523b6d5675998774fa6",
            "reservation_activity":"https://taskrouter.twilio.com/v1/Workspaces/WS839a1163b2a7fd63eb41bee2d96fcc77/Activities/WAcb9ee7acf668714ced126b16f2b80aae",
            "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WS839a1163b2a7fd63eb41bee2d96fcc77"
         }
      }
    });
}

function createWorkflowsReq() {
  return nock('https://taskrouter.twilio.com')
    .post(/\/Workspaces\/.*\/Workflows/)
    .reply(201, function(uri, body) {

      return {
        "sid":"WW73d461b83545e3613192b29681696dfc",
        "friendly_name":"Sales",
        "account_sid":"account_sid",
        "workspace_sid":"WSb254c83bb3b6e33a78ce321a8ebade23",
        "assignment_callback_url":"http://b5822310.ngrok.io/call/assignment",
        "fallback_assignment_callback_url":"http://b5822310.ngrok.io/call/assignment",
        "document_content_type":null,
        "configuration": '"{\\"task_routing\\":{\\"filters\\":[{\\"expression\\":\\"selected_product==\\\\\\"ProgrammableSMS\\\\\\"\\",\\"targets\\":[{\\"queue\\":\\"WQe33bd5069de6c7b0fda730cf93ad9ffc\\",\\"timeout\\":30,\\"priority\\":5},{\\"queue\\":\\"WQ306787f33813df8628285a5fd0f0c0ef\\",\\"timeout\\":30,\\"priority\\":1}],\\"timeout\\":30},{\\"expression\\":\\"selected_product==\\\\\\"ProgrammableVoice\\\\\\"\\",\\"targets\\":[{\\"queue\\":\\"WQ9f79ca1845ab845fa9b7bb3bce1f604c\\",\\"timeout\\":30,\\"priority\\":5},{\\"queue\\":\\"WQ306787f33813df8628285a5fd0f0c0ef\\",\\"timeout\\":30,\\"priority\\":1}],\\"timeout\\":30}],\\"default_filter\\":{\\"queue\\":\\"WQ306787f33813df8628285a5fd0f0c0ef\\",\\"timeout\\":30,\\"priority\\":1}}}"',
        "task_reservation_timeout":15,
        "date_created":"2016-11-22T21:46:49Z",
        "date_updated":"2016-11-22T21:46:49Z",
        "url":"https://taskrouter.twilio.com/v1/Workspaces/WSb254c83bb3b6e33a78ce321a8ebade23/Workflows/WW73d461b83545e3613192b29681696dfc",
        "links":{
        "workspace":"https://taskrouter.twilio.com/v1/Workspaces/WSb254c83bb3b6e33a78ce321a8ebade23"
        }
      }
    });
}

context.only('lib/workspace', function() {
  beforeEach(function() {
    // for the purpose of resetting any methods that were mocked.
    decache('../../lib/workspace');
  });

  describe('#deleteByFriendlyName', function() {
    it('delete workspace by name', function() {
      workspace = require('../../lib/workspace')();

      workspace.findByFriendlyName = sinon.promise();

      workspace.initWorkspace = sinon.stub()
        .returns({remove: function() {
          return true;
        }});

      workspace.findByFriendlyName.resolves({sid: 'workspace_sid'});

      return workspace.deleteByFriendlyName()
        .then(function() {
          sinon.assert.calledOnce(workspace.findByFriendlyName);
        });
    });
  });

  describe('#createClient', function() {
    it('delete workspace if it exists', function() {
      workspace = require('../../lib/workspace')();
      workspace.findByFriendlyName = sinon.promise()
                                      .resolves({sid: 'workspace_sid'});

      workspace.deleteByFriendlyName = sinon.promise().resolves();
      workspace.createWorkspace = sinon.promise()
                                    .resolves({sid: 'workspace_sid'});

      return workspace.createClient()
        .then(function() {
          expect(workspace.deleteByFriendlyName.calledOnce);
        });
    });

    it('create workspace whether exists or not', function() {
      workspace = require('../../lib/workspace')();
      workspace.findByFriendlyName = sinon.promise()
                                      .resolves({sid: 'workspace_sid'});

      workspace.deleteByFriendlyName = sinon.promise().resolves();
      workspace.createWorkspace = sinon.promise()
                                    .resolves({sid: 'workspace_sid'});

      return workspace.createClient()
        .then(function() {
          expect(workspace.createWorkspace.calledOnce);
        });
    });
  });

  describe('#createWorkspace', function() {
    it('creates a new workspace', function() {
      workspace = require('../../lib/workspace')();

      createWorkspaceReq();
      getWorkspacesReq();
      deleteWorkspaceReq();

      return workspace.deleteByFriendlyName(WORKSPACE_NAME)
        .then(function() {
          return workspace.createWorkspace()
          .then(function(workspace) {
            expect(workspace.constructor.name).to.be.equal('WorkspaceInstance');
          });
        });
    });
  });

  describe('#findByFriendlyName', function() {
    it('find existing workspace by name', function() {
      workspace = require('../../lib/workspace')();

      getWorkspacesReq();

      return workspace.findByFriendlyName(WORKSPACE_NAME)
        .then(function(workspace) {
          expect(workspace.constructor.name).to.be.equal('WorkspaceInstance');
        });
    });
  });

  describe('#initWorkspace', function() {
    it('create workspace instance', function() {
      workspace = require('../../lib/workspace')();

      getWorkspacesReq();

      return workspace.findByFriendlyName(WORKSPACE_NAME)
        .then(function(workspace) {
          expect(workspace.constructor.name).to.be.equal('WorkspaceInstance');
        });
    });
  });

  describe('#createBobWorker', function() {
    it('creates a bob worker', function() {
      workspace = require('../../lib/workspace')();

      createWorkspaceReq();
      getWorkspacesReq();
      getWorkspacesReq();
      deleteWorkspaceReq();
      getActivitiesReq();
      createWorkerReq();

      return workspace.initClient()
        .then(function() {
          return workspace.createBobWorker()
          .then(function(worker) {
            expect(worker.constructor.name).to.be.equal('WorkerInstance');
          });
        })
    });
  });

  describe('#createAliceWorker', function() {
    it('creates a Alice worker', function() {
      workspace = require('../../lib/workspace')();

      createWorkspaceReq();
      getWorkspacesReq();
      getWorkspacesReq();
      deleteWorkspaceReq();
      getActivitiesReq();
      createWorkerReq();

      return workspace.initClient()
        .then(function() {
          return workspace.createAliceWorker()
          .then(function(worker) {
            expect(worker.constructor.name).to.be.equal('WorkerInstance');
          });
        })
    });
  });

  describe('#createWorkflowActivities', function() {
    it('creates necessary workflow activities', function() {
      var workspace = require('../../lib/workspace')();

      createWorkspaceReq();
      getWorkspacesReq();
      getWorkspacesReq();
      deleteWorkspaceReq();
      getActivitiesReq();
      createActivitiesReq();
      createActivitiesReq();
      createActivitiesReq();
      getActivitiesReq();

      return workspace.initClient()
        .then(function() {
          return workspace.createWorkflowActivities()
          .then(function(activities) {
            expect(activities[0].constructor.name).to.be.equal('ActivityInstance');
          });
        })
    });
  });


  describe('#setup', function () {
    it('returns workspace information', function () {
      workspace = require('../../lib/workspace')();
      process.env.ALICE_NUMBER = '+551111111111';
      process.env.BOB_NUMBER = '+201111111111';
      process.env.HOST = 'https://ngrok.io';

      getWorkspacesReq();
      getWorkspacesReq();
      deleteWorkspaceReq();
      createWorkspaceReq();
      getActivitiesReq();
      getActivitiesReq();
      getActivitiesReq();
      getActivitiesReq();
      getActivitiesReq();
      getActivitiesReq();
      createActivitiesReq();
      createActivitiesReq();
      createActivitiesReq();
      createTaskQueueReq();
      createTaskQueueReq();
      createTaskQueueReq();
      createWorkerReq();
      createWorkerReq();
      createWorkflowsReq();

      return workspace.setup()
        .then(function (data) {
          var workerInfo = data[0],
              workspaceInfo = data[1];
          expect(workspaceInfo.workspaceSid.match(/^WS{32}/));
          expect(workspaceInfo.workflowSid.match(/^WW{32}/));
          // expect(workspaceInfo.activities.idle).to.be.equals('WAce62b8a472c363a49bd604f0d226cd8d');
          // expect(workspaceInfo.activities.offline).to.be.equals('WAc30aec85a6ffe44693da7a0f84be5846');
          // expect(workerInfo[process.env.ALICE_NUMBER]).to.be.equals('WKfd6a35e83f81e77d723894ce01c89091');
          // expect(workerInfo[process.env.BOB_NUMBER]).to.be.equals('WK9d3cc6f1b18a93496b1d9768b25ba5e3');
        })
    });
  });
});
