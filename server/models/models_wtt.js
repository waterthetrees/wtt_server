/* eslint-disable camelcase */
/* eslint-disable no-template-curly-in-string */
const pgp = require('pg-promise')({
  /* initialization options */
  capSQL: true, // capitalize all generated SQL
});

const { inspect } = require('util');
const {
  info, error,
} = require('../../logger.js');
const { configTreeDB } = require('../db/config_treedb.js');

const treeDB = pgp(configTreeDB);

async function updateTreeModel(newTreeData, keys, id_tree) {
  const functionName = 'updateTreeModel';
  try {
    const stringCondition = ` WHERE id_tree = ${id_tree} RETURNING id_tree AS "idTree", common, health, notes`;
    const condition = pgp.as.format(stringCondition, newTreeData);
    const queryString = () => pgp.helpers.update(newTreeData, keys, 'treedata') + condition;
    const results = await treeDB.query(queryString, newTreeData);
    return results;
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

async function insertTreeModel(newTree) {
  const functionName = 'insertTreeModel';
  try {
    // info(`${inspect(newTree, true, 5, true)} ${functionName}`);
    const queryString = 'INSERT INTO treedata(${this:name}) VALUES(${this:csv}) RETURNING treedata.id_tree AS "idTree", treedata.common, treedata.scientific,treedata.volunteer, treedata.date_planted AS "dateVisit"';
    // info(`${functionName} queryString ${queryString}`);
    return await treeDB.query(queryString, newTree);
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

async function insertUserModel(user) {
  const functionName = 'insertUserModel';
  try {
    const queryString = 'INSERT INTO users(${this:name}) VALUES(${this:csv}) RETURNING users.id_user AS idUser, users.email, users.name, users.nickname';
    // info(`${functionName} queryString ${queryString}`);
    return await treeDB.query(queryString, user);
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

async function updateTreeHistoryModel(newTreeHistory, keys) {
  const functionName = 'updateTreeHistoryModel';
  try {
    // info(`${functionName} newTreeHistory ${newTreeHistory}`);
    const condition = pgp.as.format(' WHERE id_tree = ${id_tree} AND volunteer = ${volunteer} AND created::date = CURRENT_DATE RETURNING treehistory.id_treehistory AS idTreeHistory, treehistory.id_tree AS idTree, treehistory.watered, treehistory.mulched, treehistory.pruned, treehistory.staked, treehistory.weeded, treehistory.braced, treehistory.adopted, treehistory.liked, treehistory.volunteer, treehistory.date_visit AS dateVisit', newTreeHistory);
    const queryString = () => pgp.helpers.update(newTreeHistory, keys, 'treehistory') + condition;
    // info(`${functionName} queryString ${queryString}`);
    return await treeDB.query(queryString, newTreeHistory);
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

async function insertTreeHistoryModel(newTreeHistory) {
  const functionName = 'insertTreeHistoryModel';
  try {
    const queryString = 'INSERT INTO treehistory(${this:name}) VALUES(${this:csv}) RETURNING treehistory.id_treehistory AS idTreeHistory, treehistory.id_tree AS idTree, treehistory.watered, treehistory.mulched, treehistory.pruned, treehistory.staked, treehistory.weeded, treehistory.braced, treehistory.adopted, treehistory.liked, treehistory.volunteer, treehistory.date_visit AS dateVisit';
    return await treeDB.query(queryString, newTreeHistory);
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}
async function insertTreeAdoptionModel(newTreeAdopted) {
  const functionName = 'insertTreeAdoptionModel';
  try {
    const queryString = 'INSERT INTO treeadoption(${this:name}) VALUES(${this:csv}) RETURNING id_adopted AS "idAdopted", id_tree AS "idTree", common, email, created AS "dateVisit"';
    return await treeDB.query(queryString, newTreeAdopted);
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

async function insertTreeLikesModel(newTreeLiked) {
  const functionName = 'insertTreeLikesModel';
  try {
    const queryString = 'INSERT INTO treelikes(${this:name}) VALUES(${this:csv}) RETURNING id_liked AS "idLiked", id_tree AS "idTree", common, email, created AS "dateVisit"';
    return await treeDB.query(queryString, newTreeLiked);
  } catch (err) {
    error(`${functionName} CATCH ${err}`);
    return { error: err };
  }
}

module.exports = {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
  updateTreeModel,
  insertTreeModel,
  insertUserModel,
  insertTreeAdoptionModel,
  insertTreeLikesModel,
};
