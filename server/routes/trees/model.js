const utils = require('./utils');
const pgPromiseDB = require('../../db');

async function getTree(currentTreeId) {
  const tree = await pgPromiseDB.one(
    'SELECT * FROM treedata WHERE id_tree = $1',
    [currentTreeId]
  );

  tree.healthNum = utils.convertHealthToNumber(tree.health);

  return tree;
}

async function insertTreeModel(newTree) {
  // TODO: check if conversion to "dateVisit" is needed

  const queryString = `
      INSERT INTO treedata(\${this:name})
      VALUES(\${this:csv})
      RETURNING *, date_planted as "dateVisit"
    `;

  return await pgPromiseDB.one(queryString, newTree);
}

async function getCityExistence(city) {
  const foundCity = await pgPromiseDB.oneOrNone(
    'SELECT city FROM cities WHERE city = $1',
    [city]
  );

  return foundCity;
}

async function insertNewCityModel({ city, lng, lat, email, who }) {
  const newCity = await pgPromiseDB.one(
    `INSERT INTO cities(\${this:name}) VALUES(\${this:csv}) RETURNING *`,
    { city, lng, lat, email, who }
  );

  return newCity;
}

async function updateCitiesTreeCount(city) {
  const query = `
    UPDATE cities
    SET city_count_trees = (SELECT count(id_tree)
                            FROM treedata
                            WHERE city = '${city}')
    WHERE city = '${city}';
  `;

  return await pgPromiseDB.none(query);
}

async function insertTreeHistoryModel(newTreeHistory) {
  const queryString = `
    INSERT INTO treehistory(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;

  const treeHistory = await pgPromiseDB.one(queryString, newTreeHistory);

  return treeHistory;
}

module.exports = {
  getTree,
  insertTreeModel,
  getCityExistence,
  insertNewCityModel,
  updateCitiesTreeCount,
  insertTreeHistoryModel,
};
