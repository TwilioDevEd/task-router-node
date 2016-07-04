'use strict';

var expect = require('chai').expect,
  supertest = require('supertest'),
  cheerio = require('cheerio'),
  sinon = require('sinon'),
  mockery = require('mockery'),
  Q = require('q'),
  app = require('../../app.js');

describe('Twilio SMS webhooks', function() {
  var workspaceHelperStub = sinon.stub();
  workspaceHelperStub.findByName = sinon.stub().returns(Q.resolve(sinon.stub()));

  before(function () {
    mockery.enable({ useCleanCache: true });
    mockery.warnOnUnregistered(false);
    mockery.registerMock('workspace', sinon.stub().returns(workspaceHelperStub));
  });
  
  after(function () {
    mockery.deregisterAll();
    mockery.disable();
  });

  describe('POSTs to /sms/incoming', function () {
    context('when text body is "on"', function () {
      it('replies a change confirmation to Idle', function(done) {
        var testApp = supertest(app);
        testApp.post('/sms/incoming', {Body: "on", From: "+1337"}).expect(function (response) {
          var $ = cheerio.load(response.text);
          expect($('say').text()).to.equal('Your status has changed to Idle');
        }).expect(200, done);
      });
    });
  });
});

