import { db } from '../../db/index.js';

export default async function getAllTreeDataByCity(cityName) {
  const query = 'SELECT * FROM treedata WHERE city = $1';
  const values = [cityName];
  const cityTreeData = await db.manyOrNone(query, values);
  return cityTreeData;
}