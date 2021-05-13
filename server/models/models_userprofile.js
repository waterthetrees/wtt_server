/* eslint-disable camelcase */
// const { inspect } = require('util');
const treeDB = require('../db/treedb.js');
const {
  // info,
  error,
} = require('../../logger.js');

async function queryTreeDB(queryString, functionCallerName) {
  try {
    const results = await treeDB.query(queryString);
    return results;
  } catch (err) {
    error(`Error executing query to treeDB: ${err}, ${functionCallerName}`);
    return err;
  }
}

function getUserTreehistoryModel(user) {
  const functionName = 'getUserTreehistoryModel';
  const query = `SELECT * FROM treehistory
    WHERE email = '${user.email}'
    OR nickname = '${user.nickname}';`;
  // info(`${functionName} ${query}`);
  return queryTreeDB(query, functionName);
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

function countUserTreeModel(user, request, id) {
  const functionName = 'countUserTreeModel';
  const query = `SELECT count(${id}) 
    FROM ${request}
    WHERE email = '${user.email}';`;
  // info(`${functionName} ${query}`);
  return queryTreeDB(query, functionName);
}

module.exports = {
  countUserTreeModel,
  findUserModel,
  getUserTreehistoryModel,
};
