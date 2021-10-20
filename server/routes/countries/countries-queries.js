const { db } = require('../../db');

async function getCountries() {
  const query = `SELECT country, 
  lng, lat, 
  country_count_trees AS "countryCountTrees" 
  FROM countries;`;
  const countries = await db.many(query);
  return countries;
}

module.exports = {
  getCountries,
};