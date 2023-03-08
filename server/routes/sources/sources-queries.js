import { db, pgPromise } from '../../db/index.js';
import convertObjectKeysToSnakeCase from '../shared-routes-utils.js';

export async function createSource(data) {
  // eslint-disable-next-line no-unused-vars
  const { crosswalk, destinations, ...source } = data;

  const dataInSnakeCase = convertObjectKeysToSnakeCase(source);

  const query = `
    INSERT INTO sources(\${this:name})
    VALUES(\${this:csv})
    RETURNING country, city, id_source_name as "idSourceName", created
  `;

  const response = await db.one(query, dataInSnakeCase);
  return response;
}

export async function createCrosswalk(data) {
  const dataInSnakeCase = convertObjectKeysToSnakeCase(data);
  const query = `
    INSERT INTO crosswalk(\${this:name})
    VALUES(\${this:csv})
    RETURNING id_source_name as "idSourceName", created
  `;

  const response = await db.one(query, dataInSnakeCase);
  return response;
}

export async function findSourceCountry(country) {
  const query = `SELECT 
    id_source_name as "idSourceName", iso_alpha_3 as country, state, city, 
    email, contact, who as org, phone, 
    info, download, notes, broken
    FROM sources
    WHERE country = $1;`;
  const values = [country];
  const source = await db.any(query, values);
  return source;
}

export async function findSourceCity(city) {
  const query = `SELECT 
    id_source_name as "idSourceName", iso_alpha_3  as country, state, city, 
    email, contact, who as org, phone, 
    info, download, notes, broken
    FROM sources
    WHERE city = $1;`;
  const values = [city];
  const source = await db.any(query, values);
  return source;
}

export async function getAllSources() {
  const query = `SELECT id_source_name as "idSourceName", iso_alpha_3 as country, state, city, 
    email, contact, who, phone, 
    info, download, notes, broken 
    FROM sources;`;
  const source = await db.any(query);
  return source;
}

export async function getSourceByIdSourceName(idSourceName) {
  console.log('getSourceByIdSourceName idSourceName', idSourceName);
  const query = `SELECT 
    id_source_name as "idSourceName", 
    iso_alpha_3 as "isoAlpha3", 
    country,
    state, 
    city, 
    email, 
    contact, 
    phone, 
    info, 
    download, 
    notes, 
    filename,
    format,
    longitude,
    latitude,
    broken 
    FROM sources where id_source_name = '${idSourceName}';`;
  const source = await db.one(query);
  return source;
}

export async function getCrosswalkByIdSourceName(idSourceName) {
  console.log('getCrosswalkByIdSourceName idSourceName', idSourceName);
  const query = `SELECT 
    id_source_name as "idSourceName", 
    common,
    species, 
    genus, 
    scientific, 
    family, 
    variety, 
    class, 
    dbh, 
    height, 
    structure, 
    trunks, 
    age, 
    health, 
    crown, 
    spread, 
    planted, 
    updated, 
    location, 
    note, 
    address, 
    id_reference as "idReference", 
    owner, 
    ule, 
    ule_min as "uleMin", 
    ule_max as "uleMax", 
    cost,
    audited, 
    longitude, 
    latitude, 
    city, 
    state, 
    zip, 
    country, 
    neighborhood, 
    url, 
    urlimage, 
    status, 
    email, 
    volunteer, 
    notes, 
    legal_status as legalStatus, 
    irrigation, 
    count, 
    dbh_min as "dbhMin", 
    dbh_max as "dbhMax", 
    height_min as "heightMin", 
    height_max as "heightMax",
    crown_min as "crownMin", 
    crown_max as "crownMax"
    FROM crosswalk where id_source_name = '${idSourceName}';`;
  const source = await db.one(query);
  return source;
}

export async function updateSourceByIdSourceName(data) {
  const dataInSnakeCase = convertObjectKeysToSnakeCase(data);

  const condition = pgPromise.as.format(
    ` WHERE id_source_name = '${data.idSourceName}' RETURNING *`,
  );
  const query =
    pgPromise.helpers.update(
      dataInSnakeCase,
      Object.keys(dataInSnakeCase),
      'sources',
    ) + condition;
  const updatedSource = await db.one(query, dataInSnakeCase);
  return updatedSource;
}

export async function updateCrosswalkByIdSourceName(data, idSourceName) {
  const dataInSnakeCase = convertObjectKeysToSnakeCase(data);

  const condition = pgPromise.as.format(
    ` WHERE id_source_name = '${idSourceName}' RETURNING *`,
  );
  const query =
    pgPromise.helpers.update(
      dataInSnakeCase,
      Object.keys(dataInSnakeCase),
      'crosswalk',
    ) + condition;
  const updatedSource = await db.one(query, dataInSnakeCase);
  return updatedSource;
}
