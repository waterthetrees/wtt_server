/* eslint-disable camelcase */
/* eslint-disable no-template-curly-in-string */
const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
});
const { info, error } = require('../../logger.js');
const { configTreeDB } = require('../db/config_treedb.js');

const treeDB = pgp(configTreeDB);

async function insertUserModel(user) {
  const functionName = 'insertUserModel';
  try {
    const queryString =
      'INSERT INTO users(${this:name}) VALUES(${this:csv}) RETURNING users.id_user AS idUser, users.email, users.name, users.nickname';
    // info(`${functionName} queryString ${queryString}`);
    return await treeDB.query(queryString, user);
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

module.exports = {
  insertUserModel,
};
