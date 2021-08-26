const { db, pgPromise } = require('../../db');
const treesUtils = require('./treesUtils');
const sharedRoutesUtils = require('../sharedRoutesUtils');

async function findTreeById(currentTreeId) {
  const query = 'SELECT * FROM treedata WHERE id_tree = $1';
  const values = [currentTreeId];
  const tree = await db.one(query, values);

  tree.healthNum = treesUtils.convertHealthToNumber(tree.health);

  return tree;
}

async function addTree(newTreeData) {
  const newTreeDataInSnakeCase =
    sharedRoutesUtils.convertObjectKeysToSnakeCase(newTreeData);

  // TODO: check if 'date_planted as "dateVisit"' is needed
  const query = `
    INSERT INTO treedata(\${this:name})
    VALUES(\${this:csv})
    RETURNING *, date_planted as "dateVisit"
  `;
  const newTree = db.one(query, newTreeDataInSnakeCase);

  return newTree;
}

async function updateTreeById(updatedTreeData, idTree) {
  const updatedTreeDataInSnakeCase =
    sharedRoutesUtils.convertObjectKeysToSnakeCase(updatedTreeData);

  const condition = pgPromise.as.format(
    `WHERE id_tree = ${idTree} RETURNING *`
  );
  const query =
    pgPromise.helpers.update(
      updatedTreeDataInSnakeCase,
      Object.keys(updatedTreeDataInSnakeCase),
      'treedata'
    ) + condition;
  const updatedTree = await db.one(query, updatedTreeDataInSnakeCase);

  return updatedTree;
}

module.exports = {
  findTreeById,
  addTree,
  updateTreeById,
};
