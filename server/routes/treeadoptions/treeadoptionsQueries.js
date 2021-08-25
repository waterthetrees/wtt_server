const { db } = require('../../db');

async function findTreeAdoptionsById(idTree) {
  const query = `
    SELECT id_adopted, id_tree, email
    FROM treeadoption
    WHERE id_tree = $1;
  `;
  const values = [idTree];
  const treeAdoptions = db.manyOrNone(query, values);

  return treeAdoptions;
}

async function insertTreeAdoptionModel(newAdoptedTree) {
  const query = `
    INSERT INTO treeadoption(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;
  const newTreeAdoption = db.one(query, newAdoptedTree);

  return newTreeAdoption;
}

function deleteTreeAdoptionModel({ idTree, email }) {
  const query = `
    DELETE FROM treeadoption
    WHERE id_tree = $1 AND email = $2;
  `;
  const values = [idTree, email];
  const results = db.result(query, values);

  return results;
}

module.exports = {
  findTreeAdoptionsById,
  insertTreeAdoptionModel,
  deleteTreeAdoptionModel,
};
