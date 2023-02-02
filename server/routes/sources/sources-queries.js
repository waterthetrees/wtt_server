import { db, pgPromise } from '../../db/index.js';
import convertObjectKeysToSnakeCase from '../shared-routes-utils.js';

export async function createSource(data) {
  // eslint-disable-next-line no-unused-vars
  const { crosswalk, destinations, ...source } = data;
  console.log('createSource source', source);

  const query = `
    INSERT INTO sources(\${this:name})
    VALUES(\${this:csv})
    RETURNING country, city, id, created
  `;

  const response = await db.one(query, source);
  return response;
}

export async function createCrosswalk(data) {
  console.log('createCrosswalk data', data);
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
    email, contact, who as org, phone, 
    info, download, broken_reason as note, broken
    FROM sources
    WHERE country = $1;`;
  const values = [country];
  const source = await db.any(query, values);
  return source;
}

export async function findSourceCity(city) {
  const query = `SELECT 
    id, iso_alpha_3  as country, state, city, 
    email, contact, who as org, phone, 
    info, download, broken_reason as note, broken
    FROM sources
    WHERE city = $1;`;
  const values = [city];
  const source = await db.any(query, values);
  return source;
}

export async function getAllSources() {
  const query = `SELECT id, iso_alpha_3  as country, state, city, 
    email, contact, who, phone, 
    info, download, broken_reason as note, broken 
    FROM sources;`;
  const source = await db.any(query);
  return source;
}

export async function getSourceById(id) {
  const query = `SELECT id
    FROM sources where id = '${id}';`;
  const source = await db.any(query);
  return source;
}

export async function updateSourceById(data) {
  const dataInSnakeCase = convertObjectKeysToSnakeCase(data);

  const condition = pgPromise.as.format(` WHERE id = '${data.id}' RETURNING *`);
  const query =
    pgPromise.helpers.update(
      dataInSnakeCase,
      Object.keys(dataInSnakeCase),
      'sources',
    ) + condition;
  const updatedSource = await db.one(query, dataInSnakeCase);

  return updatedSource;
}

export async function updateCrosswalkById(data, id) {
  console.log('updateCrosswalkById data', data);
  const dataInSnakeCase = convertObjectKeysToSnakeCase(data);

  const condition = pgPromise.as.format(` WHERE id = '${id}' RETURNING *`);
  const query =
    pgPromise.helpers.update(
      dataInSnakeCase,
      Object.keys(dataInSnakeCase),
      'crosswalk',
    ) + condition;
  const updatedSource = await db.one(query, dataInSnakeCase);

  return updatedSource;
}
