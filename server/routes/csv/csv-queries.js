const { db } = require('../../db');

async function getAllTreeDataByCity(cityName) {
  const query = 'SELECT * FROM treedata WHERE city = $1';
  const values = [cityName];
  const cityTreeData = await db.manyOrNone(query, values);
  return cityTreeData;
}

module.exports = {
  getAllTreeDataByCity,
};
