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
const snakeToCamelCase = (snakeIn) => snakeIn.replace(/(\_\w)/g, (letter) => letter[1].toUpperCase());
const camelToSnakeCase = (camelIn) => camelIn.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

function convertObjectToSnakeCase(obj) {
 const newObj = {}
  for (let key in obj) {
     if (key == key.toLowerCase()) {
       // The character is lowercase
       newObj[key] = obj[key];
     }
     else {
       // The character is uppercase
       newObj[camelToSnakeCase(key)] = obj[key];
     }
  }
  console.log(obj, obj)
  return newObj;
}

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

async function updateTreeModel(newTree) {
  const functionName = 'updateTreeModel';
  try {
    convertedNewTree = convertObjectToSnakeCase(newTree)
    const keys = Object.keys(convertedNewTree);
    logger.debug(`${functionName} keys ${keys}`);
    logger.debug(`${functionName} convertedNewTree ${util.inspect(convertedNewTree)}`);
    // const condition = pgp.as.format(' WHERE id_tree = ${id_tree} RETURNING *', newTree); 
    const condition = pgp.as.format(' WHERE id_tree = ${id_tree} RETURNING id_tree AS "idTree", health, notes', convertedNewTree); 
    const queryString = () => pgp.helpers.update(convertedNewTree, keys, 'treedata') + condition;
    // logger.debug(`${functionName} queryString`, await queryString);
    const results = await treeDB.query(queryString, convertedNewTree);
    logger.debug(`${functionName} results ${util.inspect(results)}`);
    return results;
    // return {data: 'test'};
  } catch (err) {
    logger.error(`${functionName} CATCH ${err}`);
    return {error: err};
  }
}


async function updateTreeHistoryModel(newTreeHistory) {
 const condition = pgp.as.format(' WHERE id_tree = ${idTree} AND volunteer = ${volunteer} AND created_at::date = CURRENT_DATE RETURNING treehistory.id_treehistory AS idTreeHistory, treehistory.id_tree AS idTree, treehistory.watered, treehistory.mulched, treehistory.pruned, treehistory.staked, treehistory.weeded, treehistory.braced, treehistory.volunteer, treehistory.datevisit AS dateVisit', newTreeHistory);
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
