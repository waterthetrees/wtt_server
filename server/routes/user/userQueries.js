const { db } = require('../../db');
const treeDB = require('../../db/treedb');

async function queryTreeDB(queryString, functionCallerName) {
  try {
    const results = await treeDB.query(queryString);
    return results;
  } catch (err) {
    console.error(
      `Error executing query to treeDB: ${err}, ${functionCallerName}`
    );
    return err;
  }
}

function findUserModel(user) {
  const functionName = 'findUserModel';
  const query = `SELECT id_user AS "idUser", email, name, nickname FROM users
    WHERE email = '${user.email}'
    OR name = '${user.name}'
    OR nickname = '${user.nickname}';`;
  // info(`${functionName} ${query}`);
  return queryTreeDB(query, functionName);
}

async function insertUserModel(user) {
  const functionName = 'insertUserModel';
  try {
    const queryString =
      'INSERT INTO users(${this:name}) VALUES(${this:csv}) RETURNING users.id_user AS idUser, users.email, users.name, users.nickname';
    // info(`${functionName} queryString ${queryString}`);
    return await db.query(queryString, user);
  } catch (err) {
    console.error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

module.exports = {
  findUserModel,
  insertUserModel,
};
