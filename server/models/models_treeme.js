util = require('util');
const treeDB = require('../db/treedb.js');
const { logger } = require('./../../logger.js');
'use strict';
const has = Object.prototype.hasOwnProperty;

// sLat: 37.77025, wLng: -122.29289, 
// nLat: 37.77520, eLng: -122.28259
async function getMapSubsetModel(location) {
  const functionName = 'getMapModel';
  try {
    const {sLat, wLng, nLat, eLng} = location;
    const query = `SELECT id_tree, common, lng, lat, health
                   FROM treedata WHERE lng > ${wLng} AND lng < ${eLng} 
                   AND lat > ${sLat} AND lat < ${nLat};`;
    console.debug(`${functionName}  query ${ query}`);
    const results = await treeDB.query(query);
    console.debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    if (await results && has.call(results, 'rows') && results.rows.length > 0) {
      console.debug(`${functionName} results.rows ${util.inspect(results.rows, false, 10, true)}`);
      return await results.rows;
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return;
  }
}


function getGeoJson(location) {
    // const {city} = location;
    const query = `
    SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         id_tree,
        'geometry',   json_build_object( 'type', 'Point', 'coordinates', json_build_array(lng, lat)),
        'properties', json_build_object(
                        'id', id_tree,
                        'common',common )
      ) AS feature
      FROM (
        SELECT * FROM treedata
      ) inputs
    ) features;`;

    return queryTreeDB(query); 
}


async function getGeoJsonOld(location) {
  const functionName = 'getGeoJson';
  try {
    const { city } = location;

    const query = `
    SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         id_tree,
        'geometry',   json_build_object( 'type', 'Point', 'coordinates', json_build_array(lng, lat)),
        'properties', json_build_object(
                        'id', id_tree,
                        'common',common )
      ) AS feature
      FROM (
        SELECT * FROM treedata
      ) inputs
    ) features;`;

    // console.debug(`${functionName}  query ${ query}`);
    const results = await treeDB.query(query);
    // console.debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    if (await results && has.call(results, 'rows') && results.rows.length > 0) {
      // console.debug(`${functionName} results.rows[0].jsonb_build_object ${util.inspect(results.rows[0].jsonb_build_object, false, 10, true)}`);
      return await results.rows[0].jsonb_build_object;
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return;
  }
}



async function getMapByCityModel(location) {
  const functionName = 'getMapModel';
  try {
    console.log('location', location)
    const { city } = location;
    const query = `SELECT id_tree, common, lng, lat, health
                   FROM treedata WHERE city IS NOT NULL AND health IS NOT NULL;`;
    console.debug(`${functionName}  query ${ query}`);
    const results = await treeDB.query(query);
    console.debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    if (await results && has.call(results, 'rows') && results.rows.length > 0) {
      console.debug(`${functionName} results.rows ${util.inspect(results.rows, false, 10, true)}`);
      return await results.rows;
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return;
  }
}

// address: "2921 Rawson Street"
// city: "Oakland"
// common: "New Zealand Christmas tree"
// country: "US"
// createdat: "2020-08-27T20:38:06.747Z"
// dbh: ""
// genus: ""
// health: "good"
// height: ""
// id_tree: 643
// id_treehistory: null
// lat: 37.779287
// lng: -122.194295
// neighborhood: "Frick"
// notes: ""
// owner: "Public"
// planted: "2018-05-04T16:00:00.000Z"
// ref: "634"
// scientific: "Metrosideros excelsa"
// state: "CA"
// status: ""
// url: ""
// urlimage: ""
// uuid_tree: "abd3fe95-70ce-4fb5-82f7-cc01e43e2663"
// who: "tfo"
// zip: ""

async function getTreeModel(currentTreeId) {
  const functionName = 'getTreeModel';
  try {
    console.debug(`${functionName} currentTreeId ${currentTreeId}`);

    const query = `SELECT id_tree, common, scientific, planted, health, 
      address, city, country, neighborhood, lat, lng, owner, ref, who, notes
     FROM treedata WHERE id_tree = ${currentTreeId};`;
    console.debug(`${functionName}  query ${ query}`);
    const results = await treeDB.query(query);
    // console.debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    if (await results && has.call(results, 'rows') && results.rows.length > 0) {
      // console.debug(`${functionName} results.rows[0] ${util.inspect(results.rows[0], false, 10, true)}`);
      return await results.rows[0];
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return;
  }
}

async function getTreeHistoryModel(currentTreeId) {
  const functionName = 'getTreeHistoryModel';
  try {
    console.debug(`${functionName} currentTreeId ${currentTreeId}`);

    const query = `SELECT id_treehistory, id_tree, 
    watered, mulched, weeded, staked, braced, pruned, 
    datevisit, comment, volunteer 
    FROM treehistory WHERE id_tree = ${currentTreeId};`;
    console.debug(`${functionName}  query ${ query}`);
    const results = await treeDB.query(query);
    console.debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    if (await results && has.call(results, 'rows') && results.rows.length > 0) {
      // console.debug(`${functionName} results.rows[0] ${util.inspect(results, false, 10, true)}`);
      return await results.rows;
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return;
  }
}

async function queryTreeDB(queryString) {
  try {
    const results = await treeDB.query(queryString);

    // console.debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    return results;
  } catch (err) {
    logger.error(`Error executing query to treeDB`, err);
    return err;
  }
}


function postNoteModel( id_tree, note ) {
  id_tree = 649;
  const query = ` UPDATE treedata
    SET notes = ''
    WHERE id_tree = ${id_tree}
    RETURNING *;`
    return queryTreeDB(query);
  }

module.exports = { getMapSubsetModel, getMapByCityModel, getTreeModel, getGeoJson, getTreeHistoryModel, postNoteModel };