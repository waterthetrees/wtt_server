const { db } = require('../../db');
const sharedRoutesUtils = require('../sharedRoutesUtils');

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

async function likeTree(likedTreeData) {
  const likedTreeDataInSnakeCase =
    sharedRoutesUtils.convertObjectKeysToSnakeCase(likedTreeData);

  const queryString = `
    INSERT INTO treelikes(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;
  const newTreeLiked = db.one(queryString, likedTreeDataInSnakeCase);

  return newTreeLiked;
}

function unlikeTree({ idTree, email }) {
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
  likeTree,
  unlikeTree,
};
