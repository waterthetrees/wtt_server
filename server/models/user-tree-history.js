const { queryTreeDB } = require("../db/treedb.js");

function findUserTreeHistory(volunteer) {
  const query = `
    SELECT treehistory.date_visit as "dateVisit", treedata.common, treedata.scientific,
           treehistory.liked, treehistory.adopted, treehistory.watered, treehistory.mulched,
           treehistory.weeded, treehistory.staked, treehistory.braced, treehistory.pruned
    FROM treehistory
    JOIN treedata USING (id_tree)
    WHERE treehistory.volunteer = 'rommims';
  `;

  return queryTreeDB(query, findUserTreeHistory.name);
}

module.exports = {
  findUserTreeHistory,
};
