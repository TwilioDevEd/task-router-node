'use strict';

var expect = require('chai').expect,
  supertest = require('supertest'),
  mongoose = require('mongoose'),
  MissedCall = require('../../models/call'),
  sinon = require('sinon'),
  util = require('util'),
  app = require('../../app.js'),
  querystring = require('querystring'),
  mockery = require('mockery');


describe('Record a MissedCall according to event type', function() {
  var twilioClientStub = sinon.stub();
  var callStub = sinon.stub();
  twilioClientStub.calls = sinon.stub().returns(callStub);
  callStub.update = sinon.stub();

  before(function (done) {
    mockery.enable({ useCleanCache: true });
    mockery.warnOnUnregistered(false);
    mockery.registerMock('twilio', sinon.stub().returns(twilioClientStub));
    mongoose.connect(require('../../lib/db-connection')(), done);
  });
  
  after(function (done) {
    mockery.disable();
    mongoose.disconnect(done);
  });

  beforeEach(function (done) {
    this.taskAttributes = {from: '+555', selected_product: 'Rockets'};
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
  });
});

