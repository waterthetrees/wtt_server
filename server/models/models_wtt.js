const { info, error } = require('../../logger.js');
const { db } = require('../db');

async function insertUserModel(user) {
  const functionName = 'insertUserModel';
  try {
    const queryString =
      'INSERT INTO users(${this:name}) VALUES(${this:csv}) RETURNING users.id_user AS idUser, users.email, users.name, users.nickname';
    // info(`${functionName} queryString ${queryString}`);
    return await db.query(queryString, user);
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

module.exports = {
  insertUserModel,
};
