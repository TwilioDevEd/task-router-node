require('dotenv-safe').load();
var mongoose = require('mongoose');
mongoose.Promise = Promise;

function connect() {
  var connStr = process.env.MONGO_URL;
  var conn;

  conn = mongoose.connections[0];

  if (!conn) {
    conn = mongoose.connect(connStr);
  } else {
    if (!conn.host) {
      conn = mongoose.connect(connStr);
    }
  }

  return conn;
};

module.exports = connect();
