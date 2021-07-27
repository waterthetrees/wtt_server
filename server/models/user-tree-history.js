const { queryTreeDB } = require('../db/treedb.js');

function findUserTreeHistory(volunteer) {
  const query = `
    SELECT date_visit as "dateVisit", liked, adopted, watered, mulched, weeded, staked, braced, pruned
    FROM treehistory
    WHERE volunteer = 'rommims';
  `;

  return queryTreeDB(query, findUserTreeHistory.name);
}

module.exports = {
  findUserTreeHistory,
};
