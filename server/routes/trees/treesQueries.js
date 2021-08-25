const { db, pgPromise } = require('../../db');
const treesUtils = require('./treesUtils');

async function findTreeById(currentTreeId) {
  const query = 'SELECT * FROM treedata WHERE id_tree = $1';
  const values = [currentTreeId];
  const tree = await db.one(query, values);

  tree.healthNum = treesUtils.convertHealthToNumber(tree.health);

  return tree;
}

async function addTree(newTreeData) {
  // TODO: check if 'date_planted as "dateVisit"' is needed
  const query = `
    INSERT INTO treedata(\${this:name})
    VALUES(\${this:csv})
    RETURNING *, date_planted as "dateVisit"
  `;
  const newTree = db.one(query, newTreeData);

  return newTree;
}

async function updateTreeById(updatedTreeData, idTree) {
  const condition = pgPromise.as.format(
    `WHERE id_tree = ${idTree} RETURNING *`
  );
  const query =
    pgPromise.helpers.update(
      updatedTreeData,
      Object.keys(updatedTreeData),
      'treedata'
    ) + condition;
  const updatedTree = await db.one(query, updatedTreeData);

  return updatedTree;
}

module.exports = {
  findTreeById,
  addTree,
  updateTreeById,
};
