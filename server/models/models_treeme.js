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
    const query = `SELECT id, common, lng, lat, health
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

async function getGeoJson(location) {
  const functionName = 'getGeoJson';
  try {
    const { city } = location;
    // const city  = 'Oakland';
    // const query = `SELECT jsonb_build_object(
    //   'type',     'FeatureCollection',
    //   'features', jsonb_agg(feature)
    // )
    // FROM (
    //   SELECT jsonb_build_object(
    //     'type',       'Feature',
    //     'id',         gid,
    //     'geometry',   ST_AsGeoJSON(geom)::jsonb,
    //     'properties', to_jsonb(row) - 'gid' - 'geom'
    //   ) AS feature
    //   FROM (SELECT * FROM treedata WHERE city IS NOT NULL AND health IS NOT NULL) row) features;`;

// SELECT json_build_object(
//           'type', 'FeatureCollection',
//           'features', json_agg(json_build_object(
//               'type', 'Feature',
//               'id', p.id,
//               'geometry', json_build_object(
//                   'type', 'Point',
//                   'coordinates', json_build_array(p.lng, p.lat),
//               )))) FROM treedata p;

    // const query = `
    // SELECT 
    // json_build_object('type', 'FeatureCollection', 'features', json_agg(
    // json_build_object('type', 'Feature','id', p.id,'geometry', 
    // json_build_object( 'type', 'Point', 'coordinates', 
    // json_build_array(p.lng, p.lat))))) FROM treedata p;`;

    // const query = `
    // SELECT 
    // json_build_object('type', 'FeatureCollection', 'features', json_agg(
    // json_build_object('type', 'Feature','id', p.id,'geometry', 
    // json_build_object( 'type', 'Point', 'coordinates', 
    // json_build_array(p.lng, p.lat))))) FROM treedata p;`;

    const query = `
    SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         id,
        'geometry',   json_build_object( 'type', 'Point', 'coordinates', json_build_array(lng, lat)),
        'properties', json_build_object(
                        'id', id,
                        'common',common )
      ) AS feature
      FROM (
        SELECT * FROM treedata
      ) inputs
    ) features;`;


// select json_agg(t) FROM (SELECT * from table) t;
           // 'properties', json_build_object(
           //        'name', p.name,
           //        'address', p.address
           //        'id', p.id,
           //        'ref', p.ref,
           //        'who', p.who,
           //        'common', p.common,
           //        'scientific', p.scientific,
           //        'genus', p.genus
           //    )
      // 'planted',
                  // 'address',
                  // 'city',
                  // 'state',
                  // 'zip',
                  // 'country',
                  // 'neighborhood',
                  // 'health',
                  // 'dbh',
                  // 'height',
                  // 'owner',
                  // 'url',
                  // 'urlimage',
                  // 'status',
                  // 'notes',
                  // 'createdat',
                  // 'id_treehistory'

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
    const query = `SELECT id, common, lng, lat, health
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

async function getTreeModel(lat, lng) {
  const functionName = 'getTreeModel';
  try {
    const query = `SELECT * FROM treedata WHERE lat = ${lat} AND lng = ${lng} `;
    console.debug(`${functionName}  query ${ query}`);
    const results = await treeDB.query(query);
    console.debug(`${functionName} results ${util.inspect(results, false, 10, true)}`);

    if (await results && has.call(results, 'rows') && results.rows.length > 0) {
      console.debug(`${functionName} results.rows ${util.inspect(results.rows, false, 10, true)}`);
      return await results.rows[0];
    }
    return undefined;
  } catch (err) {
    logger.error(`${functionName} ${err}`);
    return;
  }
}

module.exports = { getMapSubsetModel, getMapByCityModel, getTreeModel, getGeoJson };