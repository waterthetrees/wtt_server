const env = process.argv[2] || "dev";
// const Pool = require('pg-pool');
const util = require("util");
const { Pool } = require("pg");

// Example from here:
// https://github.com/brianc/node-postgres/tree/master/packages/pg-pool
const config = {
  // POSTGRES
  // Client: NativeClient ??
  local: {
    // connectionLimit: 10,
    database: "treedb",
    user: "trees",
    host: "localhost",
    password: "trees",
    port: 5432,
    dateStrings: "date",
  },
  dev: {
    // connectionLimit: 10,
    database: "treedb",
    user: "trees",
    host: "localhost",
    password: "trees",
    port: 5432,
    dateStrings: "date",
  },
}[env];

const pool = new Pool(config);

module.exports = {
  query: (text, params) => pool.query(text, params),
};

// //you can supply a custom client constructor
// //if you want to use the native postgres client
// var NativeClient = require('pg').native.Client
// var nativePool = new Pool({ Client: NativeClient })

// //you can even pool pg-native clients directly
// var PgNativeClient = require('pg-native')
// var pgNativePool = new Pool({ Client: PgNativeClient })
