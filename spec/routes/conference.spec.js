'use strict';

var expect = require('chai').expect,
  supertest = require('supertest'),
  cheerio = require('cheerio'),
  app = require('../../app.js'),
  MissedCall = require('../../models/call'),
  mongoose = require('mongoose');

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
