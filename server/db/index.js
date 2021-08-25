const pgp = require('pg-promise');
const dbConfig = require('./dbConfig');
const pgPromiseConfig = require('./pgPromiseConfig');

const pgPromise = pgp(pgPromiseConfig);
const db = pgPromise(dbConfig);

module.exports = {
  pgPromise,
  db,
};
