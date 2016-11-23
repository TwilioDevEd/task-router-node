'use strict';

require('dotenv-safe').load();

var mongoose = require('mongoose');
mongoose.Promise = Promise;

function connect() {
  var connStr = process.env.MONGO_URL;
  var conn;

  conn = mongoose.connections[0];

  if (needsCreateConnection(conn)) {
    conn = mongoose.connect(connStr);
  }

  return conn;
}

var needsCreateConnection = function(conn) {
  return !conn || !conn.host;
}

module.exports = connect();
