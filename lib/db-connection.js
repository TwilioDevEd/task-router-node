'use strict';

require('dotenv-safe').load();

var mongoose = require('mongoose');
mongoose.Promise = Promise;

function connect() {
  var connStr = process.env.MONGO_URI;
  var conn;

  conn = mongoose.connections[0];

  if (needsCreateConnection(conn)) {
    conn = mongoose.connect(connStr);
  }

  return conn;
}

function needsCreateConnection(conn) {
  return !conn || !conn.host;
}

module.exports = connect();
