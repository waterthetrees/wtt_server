const pgp = require('pg-promise')({
  capSQL: true,
});
const pgPromiseDB = require('../../db');
const utils = require('./treesUtils');

async function findTreeById(currentTreeId) {
  const tree = await pgPromiseDB.one(
    'SELECT * FROM treedata WHERE id_tree = $1',
    [currentTreeId]
  );

  tree.healthNum = utils.convertHealthToNumber(tree.health);

  return tree;
}

async function addTree(newTree) {
  // TODO: check if conversion to "dateVisit" is needed

  const queryString = `
      INSERT INTO treedata(\${this:name})
      VALUES(\${this:csv})
      RETURNING *, date_planted as "dateVisit"
    `;

  return pgPromiseDB.one(queryString, newTree);
}

async function updateTreeById(updatedTreeData, idTree) {
  const condition = pgp.as.format(`WHERE id_tree = ${idTree} RETURNING *`);

  const queryString =
    pgp.helpers.update(
      updatedTreeData,
      Object.keys(updatedTreeData),
      'treedata'
    ) + condition;

  const updatedTree = await pgPromiseDB.one(queryString, updatedTreeData);

  return updatedTree;
}

module.exports = {
  findTreeById,
  addTree,
  updateTreeById,
};
