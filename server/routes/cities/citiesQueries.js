const { db } = require('../../db');

async function findCitiesByName(city) {
  if (city === 'All') {
    const allCities = await db.many('SELECT * FROM cities');

    return allCities;
  }

  const requestedCities = await db.oneOrNone(
    'SELECT * FROM cities WHERE city = $1',
    [city]
  );

  return requestedCities;
}

async function addCity({ city, lng, lat, email, who }) {
  const query = `
    INSERT INTO cities(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;
  const newCityData = { city, lng, lat, email, who };

  const newCity = await db.one(query, newCityData);

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

  return db.none(query);
}

module.exports = { findCitiesByName, addCity, updateCityTreeCount };
