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
    return results;
  } catch (err) {
    logger.error(`Error executing query to treeDB with pgp`, err);
    return err;
  }
}

function postTreeNoteModel(id_tree, note) {
  const query = ` UPDATE treedata
    SET notes = '${note}'
    WHERE id_tree = ${id_tree}
    RETURNING *;`;
  return queryTreeDB(query);
}

// async function updateTreeHistoryModel(newTreeHistory) {
//   const treeHistoryString = '';

//   let query = `UPDATE treehistory SET
//     volunteer = '${newTreeHistory.volunteer}',
//     comment = '${newTreeHistory.comment}',
//     braced = '${newTreeHistory.braced}',
//     staked = '${newTreeHistory.staked}',
//     watered = '${newTreeHistory.watered}',
//     weeded = '${newTreeHistory.weeded}',
//     mulched = '${newTreeHistory.mulched}'
//     WHERE id_tree = '${newTreeHistory.id_tree}' 
//     AND createdat::date = CURRENT_DATE
//     AND volunteer = '${newTreeHistory.volunteer}'
//     RETURNING *;`;

//   // let query = `UPDATE test SET 
//   //   data = data - 'a' || '{"a":5}'
//   //   WHERE data->>'b' = '2';`

//   // let query = `UPDATE treehistory SET object = object || '${newTreeHistory}';`
//   return queryTreeDB(query);
// }

async function updateTreeHistoryModel(newTreeHistory) {
// A typical single-object update:

// Dynamic conditions must be escaped/formatted properly:
 const condition = pgp.as.format(' WHERE id_tree = ${id_tree} AND volunteer = ${volunteer} AND createdat::date = CURRENT_DATE RETURNING *', newTreeHistory);
 const keys = Object.keys(newTreeHistory)
 
 const queryString = () => pgp.helpers.update(newTreeHistory, keys, 'treehistory') + condition;
//=> UPDATE "my-table" SET "val"=123,"msg"='hello' WHERE id = 1
return await treeDB.query(queryString, newTreeHistory);
}

// async function insertTreeHistoryModel(newTreeHistoryKeys, newTreeHistoryValues) {
//   logger.debug('newTreeHistoryKeys, newTreeHistoryValues', newTreeHistoryKeys, newTreeHistoryValues);
//   let query = `INSERT INTO treehistory (${newTreeHistoryKeys}) 
//               VALUES (${newTreeHistoryValues});`;
//   logger.debug(`query ${query}`);
//   return queryTreeDB(query);
// }

async function insertTreeHistoryModel(newTreeHistory) {
  //  // our set of columns, to be created only once (statically), and then reused,
  // // to let it cache up its formatting templates for high performance:
  // const keys = Object.keys(newTreeHistory)
  // const cs = new pgp.helpers.ColumnSet(keys, {table: 'treehistory'});

  // // data input values:
  // const values = [newTreeHistory];

  // generating a multi-row insert query inside a function:
  // const query = () => pgp.helpers.insert(values, cs);
  const queryString = 'INSERT INTO treehistory(${this:name}) VALUES(${this:csv}) RETURNING *';
  //=> INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')
  // executing the query as a function that generates the query:
  return await treeDB.query(queryString, newTreeHistory);
}

module.exports = {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
  postTreeNoteModel,
};
