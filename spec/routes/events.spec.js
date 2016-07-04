'use strict';

require('../spec-helper');

var expect = require('chai').expect,
  supertest = require('supertest'),
  MissedCall = require('../../models/missed-call'),
  sinon = require('sinon'),
  util = require('util'),
  app = require('../../app.js'),
  querystring = require('querystring'),
  mockery = require('mockery');


describe('Record a MissedCall according to event type', function() {
  var twilioClientStub = sinon.stub();
  var callStub = sinon.stub();
  twilioClientStub.calls = sinon.stub().returns(callStub);
  twilioClientStub.sendMessage = sinon.stub().returns();
  callStub.update = sinon.stub();

  before(function () {
    mockery.enable({ useCleanCache: true });
    mockery.warnOnUnregistered(false);
    mockery.registerMock('twilio', sinon.stub().returns(twilioClientStub));
  });
  
  after(function () {
    mockery.disable();
  });

  beforeEach(function (done) {
    this.taskAttributes = JSON.stringify({from: '+555', selected_product: 'Rockets', call_sid: 'callSid'});
     MissedCall.remove({}, done);
  });

  describe('TaskRouter event webhook POSTs to /events', function() {
    it('will ignore unwanted events', function(done) {
      var testApp = supertest(app);
      testApp.post('/events').send({EventType: 'unwanted.event', TaskAttributes: this.taskAttributes}).end(function () {
        MissedCall.count({}, function(err, docsCount) {
          expect(docsCount).to.be.equals(0);
          done();
        });
      });
    });

    it('will store a missed call for the case when caller hangs up while waiting', function(done) {
      var testApp = supertest(app);
      testApp.post('/events').send({EventType: 'task.canceled', TaskAttributes: this.taskAttributes}).end(function () {
        MissedCall.count({}, function(err, docsCount) {
          expect(docsCount).to.be.equals(1);
          done();
        });
      });
    });

    it('will store a missed call and redirect live call into voicemail if no agent available', function(done) {
      var testApp = supertest(app),
          voicemailAddress = 'email@example.com',
          query = querystring.stringify({
            Message: 'Sorry, All agents are busy. Please leave a message. We\'ll call you as soon as possible',
            Email: voicemailAddress
          }),
          expectedVoicemailUrl = util.format("http://twimlets.com/voicemail?%s", query);
      process.env.MISSED_CALLS_EMAIL_ADDRESS = voicemailAddress;

      testApp.post('/events').send({EventType: 'workflow.timeout', TaskAttributes: this.taskAttributes}).end(function () {
        MissedCall.count({}, function(err, docsCount) {
          expect(docsCount).to.be.equals(1);
          expect(twilioClientStub.calls.calledWith('callSid')).to.be.true;
          expect(callStub.update.args[0][0]).to.deep.equal({
            url: expectedVoicemailUrl,
            method: 'POST',
          });
          done();
        });
      });
    });

    it('will send a text to Worker when activity gets set to offline', function(done) {

      var testApp = supertest(app),
          expectedMessage = 'Your status has changed to Offline. Reply with "On" to get back Online';
      process.env.TWILIO_NUMBER = '+54321';

      testApp.post('/events').send({
        EventType: 'worker.activity.update',
        WorkerActivityName: 'Offline',
        WorkerAttributes: JSON.stringify({contact_uri: '+1234'})
      }).expect(function () {
        expect(twilioClientStub.sendMessage.called).to.be.true;
        expect(twilioClientStub.sendMessage.args[0][0]).to.deep.equal({
          to: '+1234',
          from: process.env.TWILIO_NUMBER,
          body: expectedMessage
        });
      }).expect(200, done);
    });
  });
});

