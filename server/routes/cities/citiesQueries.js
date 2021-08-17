const pgPromiseDB = require('../../db');

async function findCitiesByName(city) {
  if (city === 'All') {
    const allCities = await pgPromiseDB.manyOrNone('SELECT * FROM cities');

    return allCities;
  }

  const requestedCities = await pgPromiseDB.oneOrNone(
    'SELECT * FROM cities WHERE city = $1',
    [city]
  );

  return requestedCities;
}

async function addCity({ city, lng, lat, email, who }) {
  const newCity = await pgPromiseDB.one(
    `INSERT INTO cities(\${this:name}) VALUES(\${this:csv}) RETURNING *`,
    { city, lng, lat, email, who }
  );

  return newCity;
}

async function updateCityTreeCount(city) {
  const query = `
    UPDATE cities
    SET city_count_trees = (SELECT count(id_tree)
                            FROM treedata
                            WHERE city = '${city}')
    WHERE city = '${city}';
  `;

  return pgPromiseDB.none(query);
}

module.exports = { findCitiesByName, addCity, updateCityTreeCount };
