'use strict';

var expect = require('chai').expect,
  cheerio = require('cheerio'),
  twimlGenerator = require('../../lib/twiml-generator');

describe('twiml-generator', function() {
  it('#generateConfirmMessage', function() {
    var response = twimlGenerator.generateConfirmMessage('New Status'),
        $ = cheerio.load(response);
    expect($('message').text()).to.equal('Your status has changed to New Status');
  });
});

