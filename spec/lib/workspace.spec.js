'use strict';

var expect = require('chai').expect,
  sinon = require('sinon'),
  mockery = require('mockery');

describe('workspace', function () {
  describe('#create', function () {

    var createWorkspaceStub = sinon.stub();
    var twilioMock = {
      'TaskRouterClient': function () {
        return {
          workspaces: {
            create: createWorkspaceStub
          }
        };
      }
    };

    before(function (done) {
      mockery.enable({ useCleanCache: true });
      mockery.warnOnUnregistered(false);
      mockery.registerMock('twilio', twilioMock);
      done();
    }); 

    it('can create a workspace', function () {
      var workspace = require('../../lib/workspace');
      workspace.create('My Workspace', 'event-callback-url');

      expect(createWorkspaceStub.calledWith({
        friendlyName: 'My Workspace',
        eventCallbackUrl: 'event-callback-url'
      })).to.be.true;
    }); 

    after(function (done) {
      mockery.disable();
      done();
    });
  }); 
});
