const { error } = require('../../logger');
const treeDB = require('../db/treedb');

async function queryTreeDB(queryString, functionCallerName) {
  try {
    const results = await treeDB.query(queryString);
    return results;
  } catch (err) {
    error(`Error executing query to treeDB: ${err}, ${functionCallerName}`);
    return err;
  }
}

function updateTreeNoteModel(id_tree, notes) {
  const functionName = 'updateTreeNoteModel';
  const query = ` UPDATE treedata
    SET notes = '${notes}'
    WHERE id_tree = ${id_tree}
    RETURNING id_tree AS "idTree", notes;`;
  return queryTreeDB(query, functionName);
}

function updateTreeHealthModel(id_tree, health) {
  const functionName = 'updateTreeNoteModel';
  const query = ` UPDATE treedata
    SET health = '${health}'
    WHERE id_tree = ${id_tree}
    RETURNING id_tree AS "idTree", health;`;
  return queryTreeDB(query, functionName);
}

module.exports = {
  updateTreeNoteModel,
  updateTreeHealthModel,
};
