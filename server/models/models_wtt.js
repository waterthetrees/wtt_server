const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
});

util = require('util');
const { logger } = require('../../logger.js');
const { configTreeDB } = require('../db/config_treedb.js');

const treeDB = pgp(configTreeDB);

async function queryTreeDB(queryString) {
  const functionName = 'updateTreeModel';
  try {
    const results = await treeDB.query(queryString);
    // logger.debug(`queryTreeDB results`, results);
    return results;
  } catch (err) {
    logger.error(`${functionName} CATCH in query treeDB with pgp ${err}`);
    return err;
  }
}

async function updateTreeModel(newTreeData, keys, id_tree) {
  const functionName = 'updateTreeModel';
  try {
    const stringCondition = ` WHERE id_tree = ${id_tree} RETURNING id_tree AS "idTree", health, notes`;
    const condition = pgp.as.format(stringCondition, newTreeData);
    const queryString = () => pgp.helpers.update(newTreeData, keys, 'treedata') + condition;
    const results = await treeDB.query(queryString, newTreeData);
    return results;
  } catch (err) {
    logger.error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

async function insertTreeModel(newTree, keys) {
  const functionName = 'insertTreeModel';
  try {
    logger.debug(`${functionName} newTree ${util.inspect(newTree)} keys ${keys}`);
    const queryString = 'INSERT INTO treedata(${this:name}) VALUES(${this:csv}) RETURNING treedata.id_tree AS idTree, treedata.common, treedata.scientific,treedata.volunteer, treedata.date_planted AS dateVisit';
    logger.info(`${functionName} queryString ${queryString}`);
    return await treeDB.query(queryString, newTree);
  } catch (err) {
    logger.error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

async function insertUserModel(user, keys) {
  const functionName = 'insertUserModel';
  try {
    logger.debug(`${functionName} user ${util.inspect(user)} keys ${keys}`);
    const queryString = 'INSERT INTO users(${this:name}) VALUES(${this:csv}) RETURNING users.id_user AS idUser, users.email, users.name, users.nickname';
    logger.info(`${functionName} queryString ${queryString}`);
    return await treeDB.query(queryString, user);
  } catch (err) {
    logger.error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

async function updateTreeHistoryModel(newTreeHistory, keys) {
  const functionName = 'updateTreeHistoryModel';
  try {
    const condition = pgp.as.format(' WHERE id_tree = ${id_tree} AND volunteer = ${volunteer} AND created::date = CURRENT_DATE RETURNING treehistory.id_treehistory AS idTreeHistory, treehistory.id_tree AS idTree, treehistory.watered, treehistory.mulched, treehistory.pruned, treehistory.staked, treehistory.weeded, treehistory.braced, treehistory.volunteer, treehistory.date_visit AS dateVisit', newTreeHistory);
    const queryString = () => pgp.helpers.update(newTreeHistory, keys, 'treehistory') + condition;
    return await treeDB.query(queryString, newTreeHistory);
  } catch (err) {
    logger.error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

async function insertTreeHistoryModel(newTreeHistory) {
  const functionName = 'insertTreeHistoryModel';
  try {
    const queryString = 'INSERT INTO treehistory(${this:name}) VALUES(${this:csv}) RETURNING treehistory.id_treehistory AS idTreeHistory, treehistory.id_tree AS idTree, treehistory.watered, treehistory.mulched, treehistory.pruned, treehistory.staked, treehistory.weeded, treehistory.braced, treehistory.volunteer, treehistory.date_visit AS dateVisit';
    return await treeDB.query(queryString, newTreeHistory);
  } catch (err) {
    logger.error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

module.exports = {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
  updateTreeModel,
  insertTreeModel,
  insertUserModel,
};
