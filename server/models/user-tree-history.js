const { queryTreeDB } = require('../db/treedb.js');

function findUserTreeHistory(volunteer) {
  const query = `
    SELECT id_treehistory as "idTreeHistory", id_tree AS "idTree",
    watered, mulched, weeded, staked, braced, pruned, liked, adopted,
    date_visit as "dateVisit", comment, volunteer
    FROM treehistory WHERE volunteer = 'rommims';
  `;

  return queryTreeDB(query, findUserTreeHistory.name);
}

module.exports = {
  findUserTreeHistory,
};
