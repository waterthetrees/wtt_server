const { db, pgPromise } = require('../../db');
const treesUtils = require('./trees-utils');
const sharedRoutesUtils = require('../shared-routes-utils');

async function createTree(newTreeData) {
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

async function findTreeById(id) {
  const query = 'SELECT * FROM treedata WHERE id = $1';
  const values = [id];
  const tree = await db.one(query, values);

  tree.healthNum = treesUtils.convertHealthToNumber(tree.health);

  return tree;
}

async function updateTreeById(updatedTreeData, id) {
  const updatedTreeDataInSnakeCase =
    sharedRoutesUtils.convertObjectKeysToSnakeCase(updatedTreeData);

  const condition = pgPromise.as.format(
    `WHERE id = ${id} RETURNING *`
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
  createTree,
  findTreeById,
  updateTreeById,
};
