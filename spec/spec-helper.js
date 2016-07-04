'use strict';

var mongoose = require('mongoose');

before(function (done) {
  mongoose.connect(require('../lib/db-connection')(), done);
});

after(function (done) {
  mongoose.disconnect(done);
});
