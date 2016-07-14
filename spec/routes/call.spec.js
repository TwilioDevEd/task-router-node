'use strict';

require('../spec-helper');

var expect = require('chai').expect,
  supertest = require('supertest'),
  cheerio = require('cheerio'),
  MissedCall = require('../../models/missed-call'),
  app = require('../../app.js');

describe('user calls a Twilio number', function () {
  describe('webhook POSTs to /call/incoming', function() {
    it('gathers a digit', function(done) {
      var testApp = supertest(app);
      testApp.post('/call/incoming', {}).expect(function (response) {
        var $ = cheerio.load(response.text);
        expect($('gather').attr('numdigits')).to.equal('1');
      }).expect(200, done);
    });

    it('asks Twilio to POST gathered digit to /call/enqueue', function(done) {
      var testApp = supertest(app);
      testApp.post('/call/incoming', {}).expect(function (response) {
        var $ = cheerio.load(response.text);
        expect($('gather').attr('method')).to.equal('POST');
        expect($('gather').attr('action')).to.equal('/call/enqueue');
      }).expect(200, done);
    });

    it('uses Say verb with options nested on Gather verb', function(done) {
      var testApp = supertest(app);
      testApp.post('/call/incoming', {}).expect(function (response) {
        var $ = cheerio.load(response.text);
        expect($('gather say').text()).to.equal('For Programmable SMS, press one. For Voice, press any other key.');
      }).expect(200, done);
    });
  });
});

describe('user pressed a key', function () {
  describe('Twilio POSTs digit to /call/enqueue', function() {
    it('chooses ProgrammableSMS as Task attribute if pressed key is 1', function(done) {
      var testApp = supertest(app);
      app.set('workspaceInfo', {workflowSid: 'SID123', activities: {idle: 'SID123'}});
      testApp.post('/call/enqueue').send({Digits: '1'}).expect(function (response) {
        var $ = cheerio.load(response.text);
        expect($('enqueue task').text()).to.equal('{"selected_product": "ProgrammableSMS"}');
      }).expect(200, done);
    });

    it('chooses ProgrammableVoice as Task attribute if pressed key is not 1', function(done) {
      var testApp = supertest(app);
      app.set('workspaceInfo', {workflowSid: 'SID123', activities: {idle: 'SID123'}});
      testApp.post('/call/enqueue').send({'Digits': '#'}).expect(function (response) {
        var $ = cheerio.load(response.text);
        expect($('enqueue task').text()).to.equal('{"selected_product": "ProgrammableVoice"}');
      }).expect(200, done);
    });

    it('uses workflowSid as Enqueue verb attribute for TaskRouter integration', function (done) {
      var testApp = supertest(app);
      app.set('workspaceInfo', {workflowSid: 'SID123'});
      testApp.post('/call/enqueue').send({'Digits': '#'}).expect(function (response) {
        var $ = cheerio.load(response.text);
        expect($('enqueue').attr('workflowsid')).to.equal('SID123');
      }).expect(200, done);
    });
  });
});

describe('TaskRouter matched a Task to a Worker', function () {
  describe('webhook POSTs to /call/assignment', function () {
    it('instructs to dequeue this call', function(done) {
      var testApp = supertest(app);
      app.set('workspaceInfo', {workflowSid: 'SID123', activities: {idle: 'SID123'}});
      testApp.post('/call/assignment').expect(function (response) {
        expect(response.body.instruction).to.equal("dequeue");
      }).expect(200, done);
    });

    it('specifies an Activity SID to be set later', function(done) {
      var testApp = supertest(app);
      app.set('workspaceInfo', {workflowSid: 'SID123', activities: {idle: 'SID123'}});
      testApp.post('/call/assignment').expect(function (response) {
        expect(response.body.post_work_activity_sid).to.equal("SID123");
      }).expect(200, done);
    });
  });
});

describe('missed calls', function () {

  beforeEach(function (done) {
     MissedCall.remove({}, done);
  });

  describe('GET /', function () {
    it('shows missed calls', function (done) {
      MissedCall.create({
        selectedProduct: 'ProgrammableSMS',
        phoneNumber: '+1234'
      }, function(){
        var testApp = supertest(app);
        testApp
        .get('/')
        .expect(function (res) {
          var $ = cheerio.load(res.text);
          expect($('tr td strong').text()).to.equal('ProgrammableSMS');
          expect($('tr td a').attr('href')).to.equal('tel:+1234');
        })
      .expect(200, done);
      });
    });
  });
});
