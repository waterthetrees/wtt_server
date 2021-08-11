const pgPromiseDB = require('../../db');

async function getTree(currentTreeId) {
  try {
    const tree = await pgPromiseDB.one(
      'SELECT * FROM treedata WHERE id_tree = $1',
      [currentTreeId]
    );

    return tree;
  } catch (err) {
    throw new Error(err);
  }
}

async function insertTreeModel(newTree) {
  try {
    // TODO: check if conversion to "dateVisit" is needed
    const queryString = `
      INSERT INTO treedata(\${this:name})
      VALUES(\${this:csv})
      RETURNING *, date_planted as "dateVisit"
    `;

    return await pgPromiseDB.one(queryString, newTree);
  } catch (err) {
    throw new Error(err);
  }
}

async function getCityExistence(city) {
  try {
    const foundCity = await pgPromiseDB.oneOrNone(
      'SELECT city FROM cities WHERE city = $1',
      [city]
    );

    return foundCity;
  } catch (err) {
    throw new Error(err);
  }
}

async function insertNewCityModel({ city, lng, lat, email, who }) {
  try {
    const newCity = await pgPromiseDB.one(
      `INSERT INTO cities(\${this:name}) VALUES(\${this:csv}) RETURNING *`,
      { city, lng, lat, email, who }
    );

    return newCity;
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

    return await pgPromiseDB.none(query);
  } catch (err) {
    throw new Error(err);
  }
}

async function insertTreeHistoryModel(newTreeHistory) {
  try {
    const queryString = `
      INSERT INTO treehistory(\${this:name})
      VALUES(\${this:csv})
      RETURNING *
    `;

    const treeHistory = await pgPromiseDB.one(queryString, newTreeHistory);

    return treeHistory;
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
