const { info, error } = require('../../logger.js');
const treeDB = require('../db/treedb.js');

const has = Object.prototype.hasOwnProperty;

async function queryTreeDB(queryString, functionCallerName) {
  try {
    const results = await treeDB.query(queryString);
    return results;
  } catch (err) {
    error(`Error executing query to treeDB: ${err}, ${functionCallerName}`);
    return err;
  }
}

// eslint-disable-next-line no-unused-vars
function getGeoJson(location) {
  const functionName = 'getGeoJson';
  const { city } = location || { city: '%' };
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
        WHERE city like '${city}'
        AND (modified::date = CURRENT_DATE
        OR created::date = CURRENT_DATE)
      ) inputs
    ) features;`;
  // info(`${functionName} query ${inspect(query, false, 10, true)}`);

  return queryTreeDB(query, functionName);
}

async function getTreeListModel() {
  const functionName = 'getTreeListModel';
  try {
    // const query = `SELECT DISTINCT common, scientific, genus FROM treedata
    // WHERE common <> '' limit 20;`;
    const query =
      'SELECT DISTINCT common, scientific, genus FROM treedata where genus IS NOT NULL limit 20;';
    // debug(`${functionName}  query ${query}`);
    const results = await queryTreeDB(query, functionName);
    // debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    if (
      (await results) &&
      has.call(results, 'rows') &&
      results.rows.length > 0
    ) {
      // debug(`${functionName} results.rows[0] ${util.inspect(results.rows, false, 10, true)}`);
      return await results.rows;
    }
    return undefined;
  } catch (err) {
    error(`${functionName} ${err}`);
    return err;
  }
}

async function getTreeHistoryModel(currentTreeId) {
  const functionName = 'getTreeHistoryModel';
  try {
    // debug(`${functionName} currentTreeId ${currentTreeId}`);

    const query = `SELECT id_treehistory as "idTreeHistory", id_tree AS "idTree",
    watered, mulched, weeded, staked, braced, pruned, liked, adopted,
    date_visit as "dateVisit", comment, volunteer
    FROM treehistory WHERE id_tree = ${currentTreeId}
    ORDER BY date_visit DESC limit 20;`;
    // debug(`${functionName}  query ${query}`);
    const results = await queryTreeDB(query, functionName);
    // debug(`${functionName} results ${inspect(results)}`);

    if (
      (await results) &&
      has.call(results, 'rows') &&
      results.rows.length > 0
    ) {
      // debug(`${functionName} results.rows[0] ${inspect(results.rows[0], false, 10, true)}`);
      // return ALL rows please
      return await results.rows;
    }
    return undefined;
  } catch (err) {
    error(`${functionName} ${err}`);
    return err;
  }
}

function findTreeHistoryVolunteerTodayModel(newTreeHistory) {
  const functionName = 'findTreeHistoryVolunteerTodayModel';
  const query = `SELECT id_tree AS "idTree" FROM treehistory
    WHERE id_tree = ${newTreeHistory.id_tree}
    AND created::date = CURRENT_DATE
    AND volunteer = '${newTreeHistory.volunteer}';`;
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

function updateTreeNoteModel(id_tree, notes) {
  const functionName = 'updateTreeNoteModel';
  const query = ` UPDATE treedata
    SET notes = '${notes}'
    WHERE id_tree = ${id_tree}
    RETURNING id_tree AS "idTree", notes;`;
  return queryTreeDB(query, functionName);
}

function updateTreeHealthModel(id_tree, health) {
  const functionName = 'updateTreeNoteModel';
  const query = ` UPDATE treedata
    SET health = '${health}'
    WHERE id_tree = ${id_tree}
    RETURNING id_tree AS "idTree", health;`;
  return queryTreeDB(query, functionName);
}

module.exports = {
  getGeoJson,
  getTreeHistoryModel,
  getTreeListModel,
  findTreeHistoryVolunteerTodayModel,
  updateTreeNoteModel,
  updateTreeHealthModel,
  findUserModel,
};
