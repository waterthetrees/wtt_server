/* eslint-disable camelcase */
// const { inspect } = require('util');
const treeDB = require('../db/treedb.js');
const {
  info,
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

function getUserTreehistoryModel(volunteer) {
  const functionName = 'getUserTreehistoryModel';
  const query = `SELECT * FROM treedata
    WHERE volunteer = '${volunteer}';`;
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

function countUserTreeModel(email, request, id) {
  const functionName = 'countUserTreeModel';
  const countName = `${request}Count`;
  info(`${functionName} ${countName}`);
  const query = `SELECT count(${id}) AS "${countName}"
    FROM ${request}
    WHERE email = '${email}';`;
  // info(`${functionName} ${query}`);
  return queryTreeDB(query, functionName);
}

module.exports = {
  countUserTreeModel,
  findUserModel,
  getUserTreehistoryModel,
};
