const { db } = require('../../db');
const sharedRoutesUtils = require('../shared-routes-utils');

async function findTreeAdoptionsByTreeId(id) {
  const query = `
    SELECT id_adopted, id, email
    FROM treeadoption
    WHERE id = $1;
  `;
  const values = [id];
  const treeAdoptions = db.manyOrNone(query, values);

  return treeAdoptions;
}

async function adoptTree(adoptedTreeData) {
  const adoptedTreeDataInSnakeCase =
    sharedRoutesUtils.convertObjectKeysToSnakeCase(adoptedTreeData);

  const query = `
    INSERT INTO treeadoption(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;
  const newTreeAdoption = db.one(query, adoptedTreeDataInSnakeCase);

  return newTreeAdoption;
}

async function unadoptTree({ id, email }) {
  const query = `
    DELETE FROM treeadoption
    WHERE id = $1 AND email = $2;
  `;
  const values = [id, email];
  const results = db.result(query, values);

  return results;
}

module.exports = {
  findTreeAdoptionsByTreeId,
  adoptTree,
  unadoptTree,
};
