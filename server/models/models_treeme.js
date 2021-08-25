const { error } = require('../../logger');
const treeDB = require('../db/treedb');

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
  updateTreeNoteModel,
  updateTreeHealthModel,
  findUserModel,
};
