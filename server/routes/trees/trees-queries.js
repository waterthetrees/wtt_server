import { db, pgPromise } from '../../db/index.js';
import convertObjectKeysToSnakeCase from '../shared-routes-utils.js';

export async function createTree(newTreeData) {
  const newTreeDataInSnakeCase = convertObjectKeysToSnakeCase(newTreeData);

  // TODO: check if 'date_planted as "dateVisit"' is needed
  const query = `
    INSERT INTO treedata(\${this:name})
    VALUES(\${this:csv})
    RETURNING *, date_planted as "dateVisit"
  `;
  const newTree = db.one(query, newTreeDataInSnakeCase);

  return newTree;
}

export async function findTreeById(
  id,
  id_reference,
  common,
  address,
  source_id,
) {
  const query = `SELECT 
    id, id_reference, 
    common, scientific, 
    address, city, state, zip, country, neighborhood, side_type
    source_id, lng,lat,
    dbh, height, health, water_freq, notes,
    date_planted,
    who, email, owner, location_tree_count,
    planting_opt1, planting_opt2, planting_opt3,
    modified
    FROM treedata
    WHERE id = $1;`;
  const values = [id];
  const tree = await db
    .one(query, values)
    .then((data) => data)
    .catch((error) => error);

  return tree;
}

export async function updateTreeById(updatedTreeData, id) {
  const updatedTreeDataInSnakeCase =
    convertObjectKeysToSnakeCase(updatedTreeData);

  const condition = pgPromise.as.format(`WHERE id = ${id} RETURNING *`);
  const query =
    pgPromise.helpers.update(
      updatedTreeDataInSnakeCase,
      Object.keys(updatedTreeDataInSnakeCase),
      'treedata',
    ) + condition;
  const updatedTree = await db.one(query, updatedTreeDataInSnakeCase);

  return updatedTree;
}
