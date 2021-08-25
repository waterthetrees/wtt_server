const { db } = require('../../db');

async function findTreeLikesById(idTree) {
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

module.exports = {
  findTreeLikesById,
  insertTreeLikesModel,
  deleteTreeLikesModel,
};
