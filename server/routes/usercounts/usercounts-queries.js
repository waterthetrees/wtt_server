const { db } = require('../../db');

async function findUserAdoptedTrees(email) {
  const query = `
    SELECT id_adopted, id, common
    FROM treeadoption
    WHERE email = $1;
  `;
  const values = [email];
  const userAdoptedTrees = await db.manyOrNone(query, values);

  return userAdoptedTrees;
}

async function findUserLikedTrees(email) {
  const query = `
    SELECT id_liked, id, common
    FROM treelikes
    WHERE email = $1;
  `;
  const values = [email];
  const userLikedTrees = await db.manyOrNone(query, values);

  return userLikedTrees;
}

async function findUserPlantedTrees(email) {
  const query = `
    SELECT id, common, scientific, genus, date_planted
    FROM treedata
    WHERE email = $1;
  `;
  const values = [email];
  const userPlantedTrees = await db.manyOrNone(query, values);

  return userPlantedTrees;
}

module.exports = {
  findUserAdoptedTrees,
  findUserLikedTrees,
  findUserPlantedTrees,
};
