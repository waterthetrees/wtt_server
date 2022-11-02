import { db, pgPromise } from '../../db/index.js';
import convertObjectKeysToSnakeCase from '../shared-routes-utils.js';

export async function createSource(data) {
  // eslint-disable-next-line no-unused-vars
  const { crosswalk, destinations, ...source } = data;

  const query = `
    INSERT INTO sources(\${this:name})
    VALUES(\${this:csv})
    RETURNING country, city, id, created
  `;

  const response = await db.one(query, source);
  return response;
}

export async function createCrosswalk(data) {
  const query = `
    INSERT INTO crosswalk(\${this:name})
    VALUES(\${this:csv})
    RETURNING id
  `;

  const response = await db.one(query, data);
  return response;
}

export async function findSourceCountry(country) {
  const query = `SELECT 
    id, iso_alpha_3  as country, state, city, 
    email, contact, who, phone, 
    info, download, broken, broken_reason as note
    FROM sources
    WHERE country = $1;`;
  const values = [country];
  const source = await db.any(query, values);
  return source;
}

export async function getAllSources() {
  const query = `SELECT id, iso_alpha_3  as country, state, city, 
    email, contact, who, phone, 
    info, download, broken, broken_reason as note 
    FROM sources;`;
  const source = await db.any(query);
  return source;
}

export async function updateSourceById(updatedSourceData, id) {
  const updatedSourceDataInSnakeCase =
    convertObjectKeysToSnakeCase(updatedSourceData);

  const condition = pgPromise.as.format(`WHERE id = ${id} RETURNING *`);
  const query =
    pgPromise.helpers.update(
      updatedSourceDataInSnakeCase,
      Object.keys(updatedSourceDataInSnakeCase),
      'sources',
    ) + condition;
  const updatedSource = await db.one(query, updatedSourceDataInSnakeCase);

  return updatedSource;
}
