const pgPromiseDB = require('../../db');

async function findTreeLikesModel(idTree) {
  const query = `
    SELECT id_liked, id_tree, email
    FROM treelikes
    WHERE id_tree = $1;
  `;

  const treeLikes = pgPromiseDB.manyOrNone(query, [idTree]);

  return treeLikes;
}

async function insertTreeLikesModel(newTreeLiked) {
  const queryString = `
    INSERT INTO treelikes(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;

  return pgPromiseDB.oneOrNone(queryString, newTreeLiked);
}

function deleteTreeLikesModel({ idTree, email }) {
  const query = `
    DELETE FROM treelikes
    WHERE id_tree = $1 AND email = $2;
  `;

  return pgPromiseDB.result(query, [idTree, email]);
}

async function findTreeAdoptionModel(idTree) {
  const query = `
    SELECT id_adopted, id_tree, email
    FROM treeadoption
    WHERE id_tree = $1;
  `;

  return pgPromiseDB.manyOrNone(query, [idTree]);
}

async function insertTreeAdoptionModel(newTreeAdopted) {
  const queryString = `
    INSERT INTO treeadoption(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;

  return pgPromiseDB.oneOrNone(queryString, newTreeAdopted);
}

function deleteTreeAdoptionModel({ idTree, email }) {
  const query = `
    DELETE FROM treeadoption
    WHERE id_tree = $1 AND email = $2;
  `;

  return pgPromiseDB.result(query, [idTree, email]);
}

module.exports = {
  findTreeLikesModel,
  insertTreeLikesModel,
  deleteTreeLikesModel,
  findTreeAdoptionModel,
  insertTreeAdoptionModel,
  deleteTreeAdoptionModel,
};
