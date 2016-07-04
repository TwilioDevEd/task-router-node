'use strict';

var expect = require('chai').expect,
  sinon = require('sinon'),
  Q = require('q'),
  mockery = require('mockery');

describe('workspace', function () {

  var workspacesStub = sinon.stub();
  var twilioMock = {
    'TaskRouterClient': function () {
      return { workspaces: workspacesStub, workspace: workspacesStub };
    }
  };

  before(function (done) {
    mockery.enable({ useCleanCache: true });
    mockery.warnOnUnregistered(false);
    mockery.registerMock('twilio', twilioMock);
    done();
  });

  describe('#create', function () {
    it('should create a workspace', function () {
      var createWorkspaceStub = sinon.stub().returns(Q.resolve({}));
      workspacesStub.create = createWorkspaceStub;

      var workspace = require('../../lib/workspace');
      workspace.create('My Workspace', 'event-callback-url');

      expect(createWorkspaceStub.calledWith({
        friendlyName: 'My Workspace',
        eventCallbackUrl: 'event-callback-url'
      })).to.be.equal(true);
    });
  });

  describe('#findByName', function () {
    it('should find a workspace by name', function (done) {
      var listWorkspaceStub = sinon.stub().returns(Q.resolve({
        workspaces: [{friendly_name: 'My Workspace'}, {friendly_name: 'Other Workspace'}]
      }));
      workspacesStub.list = listWorkspaceStub;

      var workspace = require('../../lib/workspace');
      workspace.findByName('My Workspace').then(function(found){
        expect(listWorkspaceStub.called).to.be.equal(true);
        expect(found.friendly_name).to.be.equal('My Workspace');
        done();
      }, function(err) { done(err); }).done();
    });
  });

  describe('#deleteByName', function () {
    it('should delete a workspace by name', function (done) {
      var listWorkspaceStub = sinon.stub().returns(Q.resolve({
        workspaces: [{friendly_name: 'My Workspace'}, {friendly_name: 'Other Workspace'}]
      }));
      var deleteWorkspaceStub = sinon.stub();
      workspacesStub.list = listWorkspaceStub;
      workspacesStub.delete = deleteWorkspaceStub;

      var workspace = require('../../lib/workspace');
      workspace.deleteByName('My Workspace').then(function(){
        expect(deleteWorkspaceStub.called).to.be.equal(true);
        done();
      }, function(err) { done(err); }).done();
    });
  });

  after(function (done) {
    mockery.disable();
    done();
  });
});
