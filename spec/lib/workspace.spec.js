'use strict';

var decache = require('decache');
var expect = require('chai').expect;
var mockedRequests = require('../mockedRequests')();
var sinon = require('sinon');

require('sinon-promise')(sinon);

var WORKSPACE_NAME = 'TaskRouter Node Workspace';
var workspace;

context('lib/workspace', function() {
  beforeEach(function() {
    // for the purpose of resetting any methods that were mocked.
    decache('../../lib/workspace');

    workspace = require('../../lib/workspace')();

    workspace.initClient();
  });

  describe('#deleteByFriendlyName', function() {
    it('deletes workspace by name', function() {
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

  describe('#createWorkspace', function() {
    it('creates workspace whether exists or not', function() {
      mockedRequests.createWorkspaceReq();

      return workspace.createWorkspace()
      .then(function(workspace) {
        expect(workspace.constructor.name).to.be.equal('WorkspaceInstance');
      });
    });
  });

  describe('#initWorkspace', function() {
    it('deletes workspace if it exists', function() {
      workspace.findByFriendlyName = sinon.promise()
                                      .resolves({sid: 'workspace_sid'});

      workspace.deleteByFriendlyName = sinon.promise().resolves();
      workspace.createWorkspace = sinon.promise()
                                    .resolves({sid: 'workspace_sid'});

      mockedRequests.createWorkspaceReq();

      return workspace.initWorkspace()
        .then(function() {
          expect(workspace.deleteByFriendlyName.calledOnce);
        });
    });

    it('creates workspace whether exists or not', function() {

      workspace.findByFriendlyName = sinon.promise()
                                      .resolves({sid: 'workspace_sid'});

      workspace.deleteByFriendlyName = sinon.promise().resolves({});

      mockedRequests.createWorkspaceReq();

      return workspace.initWorkspace()
      .then(function(newWorkspace) {
        expect(workspace.deleteByFriendlyName.calledOnce);
        expect(newWorkspace.constructor.name).to.be.equal('WorkspaceInstance');
      });
    });
  });

  describe('#findByFriendlyName', function() {
    it('finds existing workspace by name', function() {
      mockedRequests.getWorkspacesReq();

      return workspace.findByFriendlyName(WORKSPACE_NAME)
        .then(function(workspace) {
          expect(workspace.constructor.name).to.be.equal('WorkspaceInstance');
        });
    });
  });

  describe('#initWorkspace', function() {
    it('creates workspace instance', function() {
      mockedRequests.getWorkspacesReq();

      return workspace.findByFriendlyName(WORKSPACE_NAME)
        .then(function(workspace) {
          expect(workspace.constructor.name).to.be.equal('WorkspaceInstance');
        });
    });
  });

  describe('#createWorker', function() {
    it('creates a bob worker', function() {
      mockedRequests.createWorkerRequests();

      return workspace.initWorkspace()
        .then(function() {
          return workspace.createWorker({
            name: 'Bob',
            phoneNumber: process.env.BOB_NUMBER,
            products: ['ProgrammableSMS'],
          })
          .then(function(worker) {
            expect(worker.constructor.name).to.be.equal('WorkerInstance');
          });
        });
    });
  });

  describe('#createWorkflowActivities', function() {
    it('creates necessary workflow activities', function() {
      mockedRequests.createWorkflowActivitiesRequests();

      workspace.initClient();

      return workspace.initWorkspace()
        .then(function() {
          return workspace.createWorkflowActivities()
          .then(function(activities) {
            expect(activities[0].constructor.name).to.be.equal('ActivityInstance');
          });
        });
    });
  });


  describe('#setup', function() {
    it('returns workspace information', function () {
      mockedRequests.setupRequests();

      return workspace.setup()
        .then(function(data) {
          var workerInfo = data[0];
          var workspaceInfo = data[1];

          expect(workspaceInfo.workspaceSid.match(/^WS{32}/));
          expect(workspaceInfo.workflowSid.match(/^WW{32}/));
          expect(workspaceInfo.activities.idle.match(/^WA{32}/));
          expect(workspaceInfo.activities.offline.match(/^WA{32}/));
          expect(workerInfo[process.env.ALICE_NUMBER].match(/^WK{32}/));
          expect(workerInfo[process.env.BOB_NUMBER].match(/^WK{32}/));
        });
    });
  });
});
