import convertObjectKeysToSnakeCase from '../shared-routes-utils.js';
import { db } from '../../db/index.js';

export async function findTreeLikesByTreeId(id) {
  const query = `
    SELECT id_liked, id, email
    FROM treelikes
    WHERE id = $1;
  `;
  const values = [id];
  const treeLikes = db.manyOrNone(query, values);

  return treeLikes;
}

export async function likeTree(likedTreeData) {
  const likedTreeDataInSnakeCase =
    convertObjectKeysToSnakeCase(likedTreeData);

  const query = `INSERT INTO treelikes (id, id_tree, common, nickname, email)
    SELECT td.id, td.id_tree, td.common, u.nickname, u.email
    FROM treedata td
    INNER JOIN users u ON td.volunteer = u.nickname
    WHERE td.id = $1
    RETURNING *;`;
  const newTreeLiked = db.one(queryString, likedTreeDataInSnakeCase.id);

  return newTreeLiked;
}

export async function unlikeTree({ id, email }) {
  const query = `
    DELETE FROM treelikes
    WHERE id = $1 AND email = $2;
  `;
  const values = [id, email];
  const results = db.result(query, values);

  return results;
}