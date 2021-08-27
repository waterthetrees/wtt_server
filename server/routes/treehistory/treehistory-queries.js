const { db, pgPromise } = require('../../db');
const sharedRoutesUtils = require('../shared-routes-utils');

async function createTreeHistory(newTreeHistoryData) {
  const newTreeHistoryDataInSnakeCase =
    sharedRoutesUtils.convertObjectKeysToSnakeCase(newTreeHistoryData);

  const queryString = `
    INSERT INTO treehistory(\${this:name})
    VALUES(\${this:csv})
    RETURNING *
  `;

  const treeHistory = await db.oneOrNone(
    queryString,
    newTreeHistoryDataInSnakeCase
  );

  return treeHistory;
}

async function findTodaysTreeHistoryByTreeIdAndVolunteerName(
  idTree,
  volunteer
) {
  const query = `
    SELECT id_tree
    FROM treehistory
    WHERE created::date = CURRENT_DATE AND id_tree = $1 AND volunteer = $2
  `;
  const values = [idTree, volunteer];

  const todaysTreeHistory = await db.oneOrNone(query, values);

  return todaysTreeHistory;
}

async function findTreeHistoryByTreeId(idTree) {
  const query = `
    SELECT id_treehistory, id_tree, watered, mulched, weeded, staked, braced,
           pruned, liked, adopted, date_visit, comment, volunteer
    FROM treehistory
    WHERE id_tree = $1
    ORDER BY date_visit DESC
    LIMIT 20
  `;
  const values = [idTree];
  const treeHistory = await db.manyOrNone(query, values);

  return treeHistory;
}

async function updateTreeHistory(updatedTreeHistoryData) {
  const updatedTreeHistoryDataInSnakeCase =
    sharedRoutesUtils.convertObjectKeysToSnakeCase(updatedTreeHistoryData);

  const condition = pgPromise.as.format(
    `WHERE created::date = CURRENT_DATE
            AND id_tree = $\{id_tree}
            AND volunteer = $\{volunteer}
      RETURNING id_treehistory, id_tree, watered, mulched, pruned, staked,
                weeded, braced, adopted, liked, volunteer, date_visit`,
    updatedTreeHistoryDataInSnakeCase
  );

  const queryString =
    pgPromise.helpers.update(
      updatedTreeHistoryDataInSnakeCase,
      Object.keys(updatedTreeHistoryDataInSnakeCase),
      'treehistory'
    ) + condition;

  const updatedTreeHistory = await db.oneOrNone(
    queryString,
    updatedTreeHistoryDataInSnakeCase
  );

  return updatedTreeHistory;
}

module.exports = {
  createTreeHistory,
  findTodaysTreeHistoryByTreeIdAndVolunteerName,
  findTreeHistoryByTreeId,
  updateTreeHistory,
};
