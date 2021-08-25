const { db } = require('../../db');

async function getGeoJSON(city) {
  const query = `
    SELECT jsonb_build_object(
      'type',     'FeatureCollection',
      'features', jsonb_agg(feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         'treedata',
        'geometry',   json_build_object( 'type', 'Point', 'coordinates', json_build_array(lng, lat)),
        'properties', json_build_object(
                        'id', id_tree,
                        'idTree', id_tree,
                        'common', common,
                        'health', health )
      ) AS feature
      FROM (
        SELECT * FROM treedata
        WHERE city like $1
        AND (modified::date = CURRENT_DATE
        OR created::date = CURRENT_DATE)
      ) inputs
    ) features;
  `;
  const values = [city];
  const geoJSON = await db.one(query, values);

  return geoJSON;
}

module.exports = { getGeoJSON };
