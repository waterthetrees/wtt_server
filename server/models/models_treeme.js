const { inspect } = require('util');
const treeDB = require('../db/treedb.js');
// const treeDBTest = require('../db/treedbtest.js');

const { logger } = require('../../logger.js');

const has = Object.prototype.hasOwnProperty;

async function queryTreeDB(queryString) {
  try {
    const results = await treeDB.query(queryString);
    return results;
  } catch (err) {
    logger.error('Error executing query to treeDB', err);
    return err;
  }
}

// async function queryTreeDBTest(queryString) {
//   try {
//     const results = await treeDBTest.query(queryString);
//     return results;
//   } catch (err) {
//     logger.error('Error executing query to treeDB', err);
//     return err;
//   }
// }

function getGeoJson(city) {
  // const testcity = 'Alameda';
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
        SELECT * FROM treedata WHERE city='${city}'
      ) inputs
    ) features;`;

  // logger.debug(`results ${inspect(results, false, 10, true)}`);
  return queryTreeDB(query);
}

async function getTreeModel(currentTreeId) {
  const functionName = 'getTreeModel';
  try {
    logger.info(`${functionName} currentTreeId ${inspect(currentTreeId, true, 1, false)}`);

    const query = `SELECT id_tree AS "idTree", common, scientific, date_planted as datePlanted, health, health as "healthNum", 
      address, city, country, zip, neighborhood, lat, lng, owner, id_reference as "idReference", who, notes
     FROM treedata WHERE id_tree = ${currentTreeId};`;
    // logger.debug(`${functionName}  query ${query}`);
    const results = await treeDB.query(query);
    // logger.debug(`${functionName} results ${inspect(results, false, 10, true)}`);

    if (
      (await results)
      && has.call(results, 'rows')
      && results.rows.length > 0
    ) {
      return await results.rows[0];
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return err;
  }
}

// async function getTreetestModel() {
//   const functionName = 'getTreetestModel';
//   try {
//     // logger.debug(`${functionName} currentTreeId ${currentTreeId}`);
//     const email = 'goods@swezlex.com';
//     const query = `SELECT * FROM treedata WHERE email='${email}';`;
//     logger.debug(`${functionName}  query ${query}`);
//     const results = await treeDBTest.query(query);

//     if (
//       (await results)
//       && has.call(results, 'rows')
//       && results.rows.length > 0
//     ) {
//       return await results.rows;
//     }
//     return undefined;
//   } catch (err) {
//     logger.error(`${functionName} ${err}`);
//     return err;
//   }
// }
// getTreetestModel()

async function getTreeListModel() {
  const functionName = 'getTreeListModel';
  try {
    const query = `SELECT DISTINCT common, scientific, genus FROM treedata 
    WHERE common <> '' limit 20;`;
    // logger.debug(`${functionName}  query ${query}`);
    const results = await treeDB.query(query);
    // logger.debug(`${functionName} results ${inspect(results, false, 10, true)}`);

    if (
      (await results)
      && has.call(results, 'rows')
      && results.rows.length > 0
    ) {
      return await results.rows;
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return err;
  }
}

async function getTreeHistoryModel(currentTreeId) {
  const functionName = 'getTreeHistoryModel';
  try {
    // logger.debug(`${functionName} currentTreeId ${currentTreeId}`);

    const query = `SELECT id_treehistory as "idTreeHistory", id_tree AS "idTree", 
    watered, mulched, weeded, staked, braced, pruned, 
    date_visit as "dateVisit", comment, volunteer 
    FROM treehistory WHERE id_tree = ${currentTreeId}
    ORDER BY date_visit DESC limit 20;`;
    // logger.debug(`${functionName}  query ${query}`);
    const results = await treeDB.query(query);
    // logger.debug(`${functionName} results ${inspect(results)}`);

    if (
      (await results)
      && has.call(results, 'rows')
      && results.rows.length > 0
    ) {
      // logger.debug(`${functionName} results.rows[0] ${inspect(results, false, 10, true)}`);
      return await results.rows;
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return err;
  }
}

function findTreeHistoryVolunteerTodayModel(newTreeHistory) {
  const query = `SELECT id_tree AS "id_tree" FROM treehistory 
    WHERE id_tree = ${newTreeHistory.idTree} 
    AND date_visit::date = CURRENT_DATE
    AND volunteer = '${newTreeHistory.volunteer}';`;
  return queryTreeDB(query);
}

function findUserModel(user) {
  const functionName = 'findUserModel';
  const query = `SELECT id_user AS "idUser", email, name, nickname FROM users 
    WHERE email = '${user.email}' 
    OR name = '${user.name}'
    OR nickname = '${user.nickname}';`;
  // logger.info(`${functionName} ${query}`);
  return queryTreeDB(query);
}

function updateTreeNoteModel(idTree, notes) {
  const query = ` UPDATE treedata
    SET notes = '${notes}'
    WHERE id_tree = ${idTree}
    RETURNING id_tree AS "idTree", notes;`;
  return queryTreeDB(query);
}

function updateTreeHealthModel(idTree, health) {
  const query = ` UPDATE treedata
    SET health = '${health}'
    WHERE id_tree = ${idTree}
    RETURNING id_tree AS "idTree", health;`;
  return queryTreeDB(query);
}

function getCities() {
  const query = 'SELECT city, lng, lat, count FROM cities;';
  return queryTreeDB(query);
}

function updateCitiesTreeCount(city) {
  const query = `update cities 
    set count = (select count(*) 
    from treedata 
    where city='${city}') 
    where city = '${city}';`;
  return queryTreeDB(query);
}

function getCityExistence(city) {
  const query = `select city from cities where city = '${city}';`;
  return queryTreeDB(query);
}

function insertNewCityModel(city, lng, lat, email, who) {
  const query = `INSERT INTO cities(city, lng, lat, email, who)
    VALUES ("${city}", "${lng}", "${lat}", "${email}", "${who}");`;
  logger.info(`${query},query`);
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
  // getTreetestModel,
  getCities,
  updateCitiesTreeCount,
  getCityExistence,
  insertNewCityModel,
};
