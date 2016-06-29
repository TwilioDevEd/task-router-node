'use strict';

var expect = require('chai').expect,
  supertest = require('supertest'),
  cheerio = require('cheerio'),
  app = require('../../app.js'),
  MissedCall = require('../../models/call'),
  mongoose = require('mongoose');

describe('user calls and Twilio voice webhook POSTs to /call/incoming', function() {
  it('will gather a digit', function(done) {
    var testApp = supertest(app);
    testApp.post('/call/incoming', {}).expect(function (response) {
      var $ = cheerio.load(response.text);
      expect($('gather').attr('numdigits')).to.equal('1');
    }).expect(200, done);
  });

  it('will ask Twilio to POST the gathered digit to /call/enqueue', function(done) {
    var testApp = supertest(app);
    testApp.post('/call/incoming', {}).expect(function (response) {
      var $ = cheerio.load(response.text);
      expect($('gather').attr('method')).to.equal('POST');
      expect($('gather').attr('action')).to.equal('/call/enqueue');
    }).expect(200, done);
  });

  it('will Say the options for the user inside of a Gather verb', function(done) {
    var testApp = supertest(app);
    testApp.post('/call/incoming', {}).expect(function (response) {
      var $ = cheerio.load(response.text);
      expect($('gather say').text()).to.equal('For Programmable SMS, press one. For Voice, press any other key.');
    }).expect(200, done);
  });
});

describe('user pressed a key, making Twilio POST to /call/enqueue', function() {
  it('will choose ProgrammableSMS as Task attribute if pressed key is 1', function(done) {
    var testApp = supertest(app);
    testApp.post('/call/enqueue').send({Digits: '1'}).expect(function (response) {
      var $ = cheerio.load(response.text);
      expect($('enqueue task').text()).to.equal('{"selected_product": "ProgrammableSMS"}');
    }).expect(200, done);
  });

  it('will choose ProgrammableVoice as Task attribute if pressed key is not 1', function(done) {
    var testApp = supertest(app);
    testApp.post('/call/enqueue').send({'Digits': '#'}).expect(function (response) {
      var $ = cheerio.load(response.text);
      expect($('enqueue task').text()).to.equal('{"selected_product": "ProgrammableVoice"}');
    }).expect(200, done);
  });

  it('will use workflowSid as Enqueue verb attribute for TaskRouter integration', function (done) {
    var testApp = supertest(app);
    testApp.post('/call/enqueue').send({'Digits': '#'}).expect(function (response) {
      var $ = cheerio.load(response.text);
      expect($('enqueue').attr('workflowsid')).to.equal('123');
    }).expect(200, done);
  });
});

describe('TaskRouter matched a Task to a Worker and POSTs to /call/assignment', function () {
  it('will instruct to dequeue this call', function(done) {
    var testApp = supertest(app);
    testApp.post('/call/assignment').expect(function (response) {
      expect(response.body.instruction).to.equal("dequeue");
    }).expect(200, done);
  });
});

describe('missed calls', function () {

  before(function (done) {
    mongoose.connect(require('../../lib/db-connection')(), done);
  });
  
  after(function (done) {
    mongoose.disconnect(done);
  });

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
