("use strict");
const pgp = require('pg-promise')({
    /* initialization options */
    capSQL: true // capitalize all generated SQL
});

util = require("util");
// const treeDB = require("../db/treedb.js");
const { logger } = require("../../logger.js");
const configTreeDB = require('../db/config_treedb.js');

const treeDB = pgp(configTreeDB);

const has = Object.prototype.hasOwnProperty;


async function queryTreeDB(queryString) {
  try {
    const results = await treeDB.query(queryString);
    logger.debug(`queryTreeDB results`, results);
    return results;
  } catch (err) {
    logger.error(`Error executing query to treeDB with pgp`, err);
    return err;
  }
}

async function updateTreeModel(newTree) {
 logger.debug(`updateTreeModel newTree`, newTree);
 const keys = Object.keys(newTree);
 const condition = pgp.as.format(' WHERE id_tree = ${id_tree} RETURNING *', newTree); 
 const queryString = () => pgp.helpers.update(newTree, keys, 'treedata') + condition;
 const results = await treeDB.query(queryString, newTree);
 logger.debug(`updateTreeModel results`, await results);
 return await results;
}

async function updateTreeHistoryModel(newTreeHistory) {
 const condition = pgp.as.format(' WHERE id_tree = ${id_tree} AND volunteer = ${volunteer} AND createdat::date = CURRENT_DATE RETURNING treehistory.id_treehistory AS idTreeHistory, treehistory.id_tree AS idTree, treehistory.watered, treehistory.mulched, treehistory.pruned, treehistory.staked, treehistory.weeded, treehistory.braced, treehistory.volunteer, treehistory.datevisit AS dateVisit', newTreeHistory);
 const keys = Object.keys(newTreeHistory)
 
 const queryString = () => pgp.helpers.update(newTreeHistory, keys, 'treehistory') + condition;
return await treeDB.query(queryString, newTreeHistory);
}

async function insertTreeHistoryModel(newTreeHistory) {
  const queryString = 'INSERT INTO treehistory(${this:name}) VALUES(${this:csv}) RETURNING treehistory.id_treehistory AS idTreeHistory, treehistory.id_tree AS idTree, treehistory.watered, treehistory.mulched, treehistory.pruned, treehistory.staked, treehistory.weeded, treehistory.braced, treehistory.volunteer, treehistory.datevisit AS dateVisit';
  return await treeDB.query(queryString, newTreeHistory);
}

module.exports = {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
  updateTreeModel
};
