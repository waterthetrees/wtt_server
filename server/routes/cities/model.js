const pgPromiseDB = require('../../db');

async function getCities(city) {
  if (city === 'All') {
    const allCities = await pgPromiseDB.many('SELECT * FROM cities');

    return allCities;
  }

  const foundCities = await pgPromiseDB.many(
    'SELECT * FROM cities WHERE city IN ($1:csv)',
    [city]
  );

  return foundCities;
}

module.exports = { getCities };
