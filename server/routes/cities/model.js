const pgPromiseDB = require('../../db');

async function getCities(city) {
  try {
    if (city === 'All') {
      const allCities = await pgPromiseDB.manyOrNone('SELECT * FROM cities');

      return allCities;
    }

    const foundCities = await pgPromiseDB.manyOrNone(
      'SELECT * FROM cities WHERE city IN ($1:csv)',
      [city]
    );

    return foundCities;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = { getCities };
