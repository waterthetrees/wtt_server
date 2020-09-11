("use strict");
const pgp = require('pg-promise')({
    /* initialization options */
    capSQL: true // capitalize all generated SQL
});

util = require("util");
// const treeDB = require("../db/treedb.js");
const { logger } = require("../../logger.js");
const { configTreeDB } = require('../db/config_treedb.js');

const treeDB = pgp(configTreeDB);


async function queryTreeDB(queryString) {
  const functionName = 'updateTreeModel';
  try {
    const results = await treeDB.query(queryString);
    logger.debug(`queryTreeDB results`, results);
    return results;
  } catch (err) {
    logger.error(`${functionName} CATCH in query treeDB with pgp ${err}` );
    return err;
  }
}

async function updateTreeModel(newTreeData, keys) {
  const functionName = 'updateTreeModel';
  logger.debug(`${functionName} newTreeData ${util.inspect(newTreeData)}`);
  logger.debug(`${functionName} keys ${keys}`);
  try {
    const condition = pgp.as.format(' WHERE id_tree = ${id_tree} RETURNING id_tree AS "idTree", health, notes', newTreeData); 
    const queryString = () => pgp.helpers.update(newTreeData, keys, 'treedata') + condition;
    // logger.debug(`${functionName} queryString`, await queryString);
    const results = await treeDB.query(queryString, newTreeData);
    logger.debug(`${functionName} results ${util.inspect(results)}`);
    return results;
    // return {data: 'test'};
  } catch (err) {
    logger.error(`${functionName} CATCH ${err}`);
    return {error: err};
  }
}


async function updateTreeHistoryModel(newTreeHistory, keys) {
  const functionName = 'updateTreeHistoryModel';
  logger.debug(`${functionName} newTreeHistory ${util.inspect(newTreeHistory)}`);
  logger.debug(`${functionName} keys ${keys}`);
  try {
    const condition = pgp.as.format(' WHERE id_tree = ${id_tree} AND volunteer = ${volunteer} AND created_at::date = CURRENT_DATE RETURNING treehistory.id_treehistory AS idTreeHistory, treehistory.id_tree AS idTree, treehistory.watered, treehistory.mulched, treehistory.pruned, treehistory.staked, treehistory.weeded, treehistory.braced, treehistory.volunteer, treehistory.date_visit AS dateVisit', newTreeHistory);
    const queryString = () => pgp.helpers.update(newTreeHistory, keys, 'treehistory') + condition;
    return await treeDB.query(queryString, newTreeHistory);
  } catch (err) {
    logger.error(`${functionName} CATCH ${err}`);
    return {error: err};
  }
}

async function insertTreeHistoryModel(newTreeHistory) {
  const functionName = 'insertTreeHistoryModel';
  logger.debug(`${functionName} newTreeData ${util.inspect(newTreeHistory)}`);
  try {
    const queryString = 'INSERT INTO treehistory(${this:name}) VALUES(${this:csv}) RETURNING treehistory.id_treehistory AS idTreeHistory, treehistory.id_tree AS idTree, treehistory.watered, treehistory.mulched, treehistory.pruned, treehistory.staked, treehistory.weeded, treehistory.braced, treehistory.volunteer, treehistory.date_visit AS dateVisit';
    return await treeDB.query(queryString, newTreeHistory);
  } catch (err) {
    logger.error(`${functionName} CATCH ${err}`);
    return {error: err};
  }
}

module.exports = {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
  updateTreeModel
};
