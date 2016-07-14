'use strict';

var expect = require('chai').expect,
  supertest = require('supertest'),
  cheerio = require('cheerio'),
  sinon = require('sinon'),
  mockery = require('mockery'),
  Q = require('q'),
  app = require('../../app.js');

describe('Twilio SMS webhooks', function() {
  var updateStub = sinon.stub().returns(Q.resolve(sinon.stub())),
  workersStub = sinon.stub().returns({
    update: updateStub
  }),
  clientStub = function () {
    this.workspace = { 
      workers: workersStub
    };
  };

  before(function () {
    mockery.enable({
          warnOnReplace: false,
          warnOnUnregistered: false
    });
    mockery.registerMock('twilio', {TaskRouterClient: clientStub});
  });
  
  after(function () {
    mockery.deregisterAll();
    mockery.disable();
  });

  describe('POSTs to /sms/incoming', function () {
    context('when text body is "on"', function () {
      it('replies a change confirmation to Idle', function(done) {
        var testApp = supertest(app);
        app.set('workspaceInfo', {workflowSid: 'SID123', activities: {idle: 'idle_sid'}});
        app.set('workerInfo', {"+1337": "workerSid"});
        testApp.post('/sms/incoming').send({Body: "on", From: "+1337"}).expect(function (response) {
          var $ = cheerio.load(response.text);
          expect($('message').text()).to.equal('Your status has changed to idle');
        }).expect(200, done);
      });
      it('changes worker activitySid', function (done) {
        var testApp = supertest(app);
        app.set('workspaceInfo', {workflowSid: 'SID123', activities: {idle: 'idle_sid'}});
        var workers = {};
        workers["+1337"] = "workerSid";
        app.set('workerInfo', workers);
        testApp.post('/sms/incoming').send({Body: "on", From: "+1337"}).expect(function () {
          expect(updateStub.args.slice(-1)[0][0]).to.deep.equal({activitySid: 'idle_sid'});
          expect(workersStub.args.slice(-1)[0][0]).to.deep.equal('workerSid');
        }).expect(200, done);
      });
    });

    context('when text body is "off"', function () {
      it('replies a change confirmation to Offline', function(done) {
        var testApp = supertest(app);
        app.set('workspaceInfo', {workflowSid: 'SID123', activities: {offline: 'off_sid'}});
        app.set('workerInfo', {"+1337": "workerSid"});
        testApp.post('/sms/incoming').send({Body: "off", From: "+1337"}).expect(function (response) {
          var $ = cheerio.load(response.text);
          expect($('message').text()).to.equal('Your status has changed to offline');
        }).expect(200, done);
      });
      it('changes worker activitySid', function (done) {
        var testApp = supertest(app);
        app.set('workspaceInfo', {workflowSid: 'SID123', activities: {offline: 'off_sid'}});
        var workers = {};
        workers["+1337"] = "workerSid";
        app.set('workerInfo', workers);
        testApp.post('/sms/incoming').send({Body: "off", From: "+1337"}).expect(function () {
          expect(updateStub.args.slice(-1)[0][0]).to.deep.equal({activitySid: 'off_sid'});
          expect(workersStub.args.slice(-1)[0][0]).to.deep.equal('workerSid');
        }).expect(200, done);
      });
    });
  });

});

