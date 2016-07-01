'use strict';

var expect = require('chai').expect,
  supertest = require('supertest'),
  cheerio = require('cheerio'),
  sinon = require('sinon'),
  mockery = require('mockery'),
  Q = require('q'),
  app = require('../../app.js');

describe('Worker replies "on" or "off" over SMS and Twilio webhook POSTs to /sms/incoming', function() {
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

  it('will change worker status to Idle when text body is "on"', function(done) {
    var testApp = supertest(app);
    testApp.post('/sms/incoming', {Body: "on", From: "+1337"}).expect(function (response) {
      var $ = cheerio.load(response.text);
      expect($('say').text()).to.equal('Your status has changed to Idle');
    }).expect(200, done);
  });
});

