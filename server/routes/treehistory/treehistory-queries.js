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
  id,
  volunteer
) {
  const query = `
    SELECT id
    FROM treehistory
    WHERE created::date = CURRENT_DATE AND id = $1 AND volunteer = $2
  `;
  const values = [id, volunteer];

  const todaysTreeHistory = await db.oneOrNone(query, values);

  return todaysTreeHistory;
}

async function findTreeHistoryByTreeId(id) {
  const query = `
    SELECT idhistory, id, watered, mulched, weeded, staked, braced,
           pruned, liked, adopted, date_visit, comment, volunteer
    FROM treehistory
    WHERE id = $1
    ORDER BY date_visit DESC
    LIMIT 20
  `;
  const values = [id];
  const treeHistory = await db.manyOrNone(query, values);

  return treeHistory;
}

async function updateTreeHistory(updatedTreeHistoryData) {
  const updatedTreeHistoryDataInSnakeCase =
    sharedRoutesUtils.convertObjectKeysToSnakeCase(updatedTreeHistoryData);

  const condition = pgPromise.as.format(
    `WHERE created::date = CURRENT_DATE
            AND id = $\{id}
            AND volunteer = $\{volunteer}
      RETURNING idhistory, id, watered, mulched, pruned, staked,
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
