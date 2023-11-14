"use strict";
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    ssl:{
      rejectUnauthorized: false // This is to bypass self-signed certificate issues, consider configuring a proper SSL certificate for production
    }
  });
} else {
  db = new Client(
    getDatabaseUri()
  );
}

db.connect();

module.exports = db;