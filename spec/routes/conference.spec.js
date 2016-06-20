'use strict';

var expect = require('chai').expect,
  supertest = require('supertest'),
  cheerio = require('cheerio'),
  app = require('../../app.js'),
  Call = require('../../models/call'),
  mongoose = require('mongoose'),
  sinon = require('sinon'),
  mockery = require('mockery');

describe('missed calls', function () {

  before(function (done) {
    mongoose.connect(require('../../lib/db-connection')(), done);
  });
  
  after(function (done) {
    mongoose.disconnect(done);
  });

  describe('GET /', function () {
    it('shows missed calls', function (done) {
      var testApp = supertest(app);
      testApp
        .get('/')
        .expect(function (res) {
          var $ = cheerio.load(res.text);
          expect($('h3').text()).to.equal('Missed Calls');
        })
      .expect(200, done);
    });
  });
});
