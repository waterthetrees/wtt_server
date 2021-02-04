util = require("util");
const treeDB = require("../db/treedb.js");
const { logger } = require("./../../logger.js");
("use strict");
const has = Object.prototype.hasOwnProperty;

async function queryTreeDB(queryString) {
  try {
    const results = await treeDB.query(queryString);
    return results;
  } catch (err) {
    logger.error(`Error executing query to treeDB`, err);
    return err;
  }
}

function getGeoJson(location) {
  // const {city} = location;
  const query = `
    SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         'treedata',
        'geometry',   json_build_object( 'type', 'Point', 'coordinates', json_build_array(lng, lat)),
        'properties', json_build_object(
                        'id', id_tree,
                        'idTree', id_tree,
                        'common', common,
                        'health', health )
      ) AS feature
      FROM (
        SELECT * FROM treedata
      ) inputs
    ) features;`;

  return queryTreeDB(query);
}

async function getTreeModel(currentTreeId) {
  const functionName = "getTreeModel";
  try {
    // console.debug(`${functionName} currentTreeId ${currentTreeId}`);

    const query = `SELECT id_tree AS "idTree", common, scientific, date_planted as datePlanted, health, health as "healthNum", 
      address, city, country, zip, neighborhood, lat, lng, owner, id_reference as "idReference", who, notes
     FROM treedata WHERE id_tree = ${currentTreeId};`;
    // console.debug(`${functionName}  query ${query}`);
    const results = await treeDB.query(query);
    // console.debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    if (
      (await results) &&
      has.call(results, "rows") &&
      results.rows.length > 0
    ) {
      // console.debug(`${functionName} results.rows[0] ${util.inspect(results.rows[0], false, 10, true)}`);
      return await results.rows[0];
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return;
  }
}



async function getTreeListModel() {
  const functionName = "getTreeListModel";
  try {
    // const query = `SELECT DISTINCT common, scientific, genus FROM treedata 
    // WHERE common <> '' limit 20;`;
    const query = `SELECT DISTINCT common, scientific, genus FROM treedata where genus IS NOT NULL limit 20;`;
    // console.debug(`${functionName}  query ${query}`);
    const results = await treeDB.query(query);
    // console.debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    if (
      (await results) &&
      has.call(results, "rows") &&
      results.rows.length > 0
    ) {
      console.debug(`${functionName} results.rows[0] ${util.inspect(results.rows, false, 10, true)}`);
      return await results.rows;
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return;
  }
}

async function getTreeHistoryModel(currentTreeId) {
  const functionName = "getTreeHistoryModel";
  try {
    // console.debug(`${functionName} currentTreeId ${currentTreeId}`);

    const query = `SELECT id_treehistory as "idTreeHistory", id_tree AS "idTree", 
    watered, mulched, weeded, staked, braced, pruned, 
    date_visit as "dateVisit", comment, volunteer 
    FROM treehistory WHERE id_tree = ${currentTreeId}
    ORDER BY date_visit DESC limit 20;`;
    // console.debug(`${functionName}  query ${query}`);
    const results = await treeDB.query(query);
    // console.debug(`${functionName} results ${util.inspect(results)}`);

    if (
      (await results) &&
      has.call(results, "rows") &&
      results.rows.length > 0
    ) {
      // console.debug(`${functionName} results.rows[0] ${util.inspect(results, false, 10, true)}`);
      return await results.rows;
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return;
  }
}

function findTreeHistoryVolunteerTodayModel(newTreeHistory) {
  let query = `SELECT id_tree AS "id_tree" FROM treehistory 
    WHERE id_tree = ${newTreeHistory.idTree} 
    AND date_visit::date = CURRENT_DATE
    AND volunteer = '${newTreeHistory.volunteer}';`;
  return queryTreeDB(query);
}

function findUserModel(user) {
  const functionName = 'findUserModel';
  let query = `SELECT id_user AS "idUser", email, name, nickname FROM users 
    WHERE email = '${user.email}' 
    OR name = '${user.name}'
    OR nickname = '${user.nickname}';`;
  logger.info(`${functionName} ${query}`);
  return queryTreeDB(query);
}

function updateTreeNoteModel(id_tree, notes) {
  const query = ` UPDATE treedata
    SET notes = '${notes}'
    WHERE id_tree = ${id_tree}
    RETURNING id_tree AS "idTree", notes;`;
  return queryTreeDB(query);
}

function updateTreeHealthModel(id_tree, health) {
  const query = ` UPDATE treedata
    SET health = '${health}'
    WHERE id_tree = ${id_tree}
    RETURNING id_tree AS "idTree", health;`;
  return queryTreeDB(query);
}

function findUserTreeHistoryModel(nickname) {
  console.log(nickname)
   let query = `SELECT id_treehistory as "idTreeHistory", id_tree AS "idTree", 
    watered, mulched, weeded, staked, braced, pruned, 
    date_visit as "dateVisit", comment, volunteer 
    FROM treehistory WHERE volunteer = '${nickname}'
    ORDER BY date_visit DESC limit 20;`;
   return queryTreeDB(query);
}

module.exports = {
  getGeoJson,
  getTreeModel,
  getTreeHistoryModel,
  getTreeListModel,
  findTreeHistoryVolunteerTodayModel,
  updateTreeNoteModel,
  updateTreeHealthModel,
  findUserModel,
  findUserTreeHistoryModel,
};