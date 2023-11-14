"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

// const ACCESS_TOKEN_SECRET='cc20316fc1aa2bf7cf08f35a0cb742809dae33fe7cf765d9b139a86b4e34e49630e36912a63066f969c829544bc1668dffa1aebf3932e94a4201ccafd229b1d9';
// const REFRESH_TOKEN_SECRET='1a7ff5570e97fa0eefd3751af766550109983625da7948805c857c50f00e19a5a200edd70b02f0e4a9862a390e37f59eb839c9175d1344d6e598a0e49e6b7802';
const PORT = process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
      ? {
        user: 'livin',
        host: 'localhost', 
        database: 'im_test',
        password: 'password', 
        port: 5432, 
      }
      : process.env.DATABASE_URL || {
        user: 'livin',
        host: 'localhost',
        database: 'im',
        password: 'password', 
        port: 5432, 
      };
}
// Speed up bcrypt during tests, since the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

console.log("Invoice Manager Config:".green);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};



