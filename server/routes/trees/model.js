const pgp = require('pg-promise')({
  capSQL: true, // capitalize all generated SQL
});
const { configTreeDB } = require('../../db/config_treedb');
const db = require('../../db/treedb');

const db2 = pgp(configTreeDB);

async function getTree(currentTreeId) {
  try {
    const query = `
      SELECT id_tree AS "idTree", common, scientific, genus,
             date_planted as "datePlanted", health, address, city,
             country, zip, neighborhood, lat, lng, owner, dbh, height,
             id_reference as "idReference", who, notes
      FROM treedata WHERE id_tree = ${currentTreeId};
    `;

    return await db.query(query);
  } catch (err) {
    throw new Error(err);
  }
}

async function insertTreeModel(newTree) {
  try {
    const queryString = `
      INSERT INTO treedata(\${this:name})
      VALUES(\${this:csv})
      RETURNING id_tree AS "idTree", common, scientific, genus,
                date_planted as "dateVisit", health, address, city,
                country, zip, neighborhood, lat, lng, owner, dbh, height,
                id_reference as "idReference", who, notes
    `;

    return await db2.query(queryString, newTree);
  } catch (err) {
    throw new Error(err);
  }
}

async function getCityExistence(city) {
  try {
    const query = `
      SELECT city
      FROM cities
      WHERE city = '${city}';
    `;

    return await db.query(query);
  } catch (err) {
    throw new Error(err);
  }
}

async function insertNewCityModel({ city, lng, lat, email, who }) {
  try {
    const query = `
      INSERT INTO cities(city, lng, lat, email, who)
      VALUES ('${city}', '${lng}', '${lat}', '${email}', '${who}');
    `;

    return await db.query(query);
  } catch (err) {
    throw new Error(err);
  }
}

async function updateCitiesTreeCount(city) {
  try {
    const query = `
      UPDATE cities
      SET city_count_trees = (SELECT count(id_tree)
                              FROM treedata
                              WHERE city = '${city}')
      WHERE city = '${city}';
    `;

    return await db.query(query);
  } catch (err) {
    throw new Error(err);
  }
}

async function insertTreeHistoryModel(newTreeHistory) {
  try {
    const queryString = `
      INSERT INTO treehistory(\${this:name})
      VALUES(\${this:csv})
      RETURNING id_treehistory AS idTreeHistory, id_tree AS idTree, watered,
                mulched, pruned, staked, weeded, braced, adopted, liked,
                volunteer, date_visit AS dateVisit
    `;

    return await db2.query(queryString, newTreeHistory);
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getTree,
  insertTreeModel,
  getCityExistence,
  insertNewCityModel,
  updateCitiesTreeCount,
  insertTreeHistoryModel,
};
