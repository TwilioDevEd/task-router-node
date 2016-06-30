'use strict';

var expect = require('chai').expect,
  supertest = require('supertest'),
  cheerio = require('cheerio'),
  mongoose = require('mongoose'),
  MissedCall = require('../../models/call'),
  app = require('../../app.js');


describe('Record a MissedCall according to event type', function() {
  before(function (done) {
    mongoose.connect(require('../../lib/db-connection')(), done);
  });
  
  after(function (done) {
    mongoose.disconnect(done);
  });

  beforeEach(function (done) {
     MissedCall.remove({}, done);
  });

  describe('TaskRouter event webhook POSTs to /events', function() {
    it('will ignore unwanted events', function(done) {
      var testApp = supertest(app);
      testApp.post('/events').send({EventType: 'unwanted.event'}).end(function () {
        MissedCall.count({}, function(err, docsCount) {
          expect(docsCount).to.be.equals(0);
          done();
        });
      });
    });
  });
});

