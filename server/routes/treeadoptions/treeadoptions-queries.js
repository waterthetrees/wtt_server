import { db } from '../../db/index.js';
import convertObjectKeysToSnakeCase from '../shared-routes-utils.js';


export async function findTreeAdoptionsByTreeId(id) {
  const query = `
    SELECT id_adopted, id, email
    FROM treeadoption
    WHERE id = $1;
  `;
  const values = [id];
  const treeAdoptions = db.manyOrNone(query, values);

  return treeAdoptions;
}

export async function adoptTree(adoptedTreeData) {
  const adoptedTreeDataInSnakeCase =
    convertObjectKeysToSnakeCase(adoptedTreeData);

  const query = `
    INSERT INTO treeadoption(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;
  const newTreeAdoption = db.one(query, adoptedTreeDataInSnakeCase);

  return newTreeAdoption;
}

export async function unadoptTree({ id, email }) {
  const query = `
    DELETE FROM treeadoption
    WHERE id = $1 AND email = $2;
  `;
  const values = [id, email];
  const results = db.result(query, values);

  return results;
}