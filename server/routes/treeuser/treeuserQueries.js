const { db } = require('../../db');

async function findTreeLikesModel(idTree) {
  const query = `
    SELECT id_liked, id_tree, email
    FROM treelikes
    WHERE id_tree = $1;
  `;
  const values = [idTree];
  const treeLikes = db.manyOrNone(query, values);

  return treeLikes;
}

async function insertTreeLikesModel(newLikedTree) {
  const queryString = `
    INSERT INTO treelikes(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;
  const newTreeLiked = db.one(queryString, newLikedTree);

  return newTreeLiked;
}

function deleteTreeLikesModel({ idTree, email }) {
  const query = `
    DELETE FROM treelikes
    WHERE id_tree = $1 AND email = $2;
  `;
  const values = [idTree, email];
  const results = db.result(query, values);

  return results;
}

async function findTreeAdoptionModel(idTree) {
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
  findTreeLikesModel,
  insertTreeLikesModel,
  deleteTreeLikesModel,
  findTreeAdoptionModel,
  insertTreeAdoptionModel,
  deleteTreeAdoptionModel,
};
