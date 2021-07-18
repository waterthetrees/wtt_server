const { queryTreeDB } = require('../db/treedb.js');

function findUserAdoptedTrees(email) {
  const query = `
    SELECT id_adopted AS "idAdopted", id_tree AS "idTree", common
    FROM treeadoption
    WHERE email = '${email}';
  `;

  return queryTreeDB(query, findUserAdoptedTrees.name);
}

function findUserLikedTrees(email) {
  const query = `
    SELECT id_liked AS "idLiked", id_tree AS "idTree", common
    FROM treelikes
    WHERE email = '${email}';
  `;

  return queryTreeDB(query, findUserLikedTrees.name);
}


function findUserPlantedTrees(email) {
  const query = `
    SELECT id_tree AS "idTree", common, scientific, genus, date_planted AS "datePlanted"
    FROM treedata
    WHERE email = '${email}';
  `;

  return queryTreeDB(query, findUserPlantedTrees.name);
}

module.exports = {
  findUserAdoptedTrees,
  findUserLikedTrees,
  findUserPlantedTrees
};
