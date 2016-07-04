'use strict';

var dbConnection = function() {
  if (process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost/task-router-test';
  }

  return 'mongodb://localhost/task-router';
};

module.exports = dbConnection;
