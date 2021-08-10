const treedb = require('../../db/treedb');

async function getTree(currentTreeId) {
  try {
    const query = `
      SELECT id_tree AS "idTree", common, scientific, genus,
             date_planted as "datePlanted", health, health as "healthNum",
             address, city, country, zip, neighborhood, lat, lng, owner,
             dbh, height, id_reference as "idReference", who, notes
      FROM treedata WHERE id_tree = ${currentTreeId};
    `;

    return await treedb.query(query);
  } catch (err) {
    return err;
  }
}

module.exports = {
  getTree,
};
