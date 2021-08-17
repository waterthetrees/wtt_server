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

async function updateTreeById(newTreeData, idTree) {
  const condition = pgp.as.format(` WHERE id_tree = ${idTree} RETURNING *`);

  const queryString =
    pgp.helpers.update(newTreeData, Object.keys(newTreeData), 'treedata') +
    condition;

  const updatedTree = await pgPromiseDB.one(queryString, newTreeData);

  return updatedTree;
}

async function insertTreeHistoryModel(newTreeHistory) {
  const queryString = `
    INSERT INTO treehistory(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;

  const treeHistory = await pgPromiseDB.one(queryString, newTreeHistory);

  return treeHistory;
}

module.exports = {
  findTreeById,
  addTree,
  updateTreeById,
  insertTreeHistoryModel,
};
