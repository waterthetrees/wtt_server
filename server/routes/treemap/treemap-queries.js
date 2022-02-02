import { db } from '../../db/index.js'

export default async function findGeoJSONByCityName(city) {
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
                        'id', id,
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
  const data = await db.one(query, values);
  const geoJSON = data.jsonbBuildObject;

  return geoJSON;
}