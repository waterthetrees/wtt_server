const util = require('util');
const {
  getGeoJson,
  getTreeModel,
  getTreeListModel,
  getTreeHistoryModel,
  findUserModel,
  findTreeHistoryVolunteerTodayModel,
  getCities,
  updateCitiesTreeCount,
} = require('./models/models_treeme.js');

const {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
  updateTreeModel,
  insertTreeModel,
  insertUserModel,
} = require('./models/models_wtt.js');

const {
  validateGetMap,
  validateGetTree,
  validateGetTreeHistory,
  validateUpdateTree,
  validatePostTree,
  validatePostUser,
  validatePostTreeHistory,
  validateGetTreeList,
} = require('./validation.js');

const { sortTrees } = require('./utilities.js');

const { logger } = require('../logger.js');

const has = Object.prototype.hasOwnProperty;

function getMap(req, res) {
  const functionName = 'getMap';
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName}`);

  const validated = validateGetMap(req);
  if (!validated) {
    responder(res, 400, { error: 'trouble getting map' });
    return;
  }

  processGetMap(req.query.city, res);
}

function responder(res, code, message) {
  const functionName = 'responder';
  res.statusCode = code;
  res.json(message);
}

async function processGetMap(city, res) {
  const functionName = 'processGetMap';
  try {
    logger.debug(`${util.inspect(city)} city ${functionName}`);

    if (city === 'All') {
      const citiesMapResults = await getCities();
      if ((await citiesMapResults) && has.call(citiesMapResults, 'rows') && citiesMapResults.rows.length > 0) {
        res.statusCode = 200;
        res.json(await citiesMapResults.rows);
        return citiesMapResults;
      }
    }

    if (city !== 'All') {
      const treeMapResults = await getGeoJson(city);
      // logger.debug(`treeMapResults ${util.inspect(treeMapResults)} ${functionName} HERE`);
      if ((await treeMapResults) && has.call(treeMapResults, 'rows') && treeMapResults.rows.length > 0) {
        const treeMapResultsObject = treeMapResults.rows[0].jsonb_build_object;
        res.statusCode = 200;
        res.json(await treeMapResultsObject);
      }
      return treeMapResults;
    }

    return city;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return err;
  }
}

function getTree(req, res) {
  const functionName = 'getTree';
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName} HERE`);
  const validated = validateGetTree(req);
  if (!validated) {
    responder(res, 400, { error: 'not a valid tree id' });
    return;
  }

  processGetTree(req.query, res);
}

async function processGetTree(query, res) {
  const functionName = 'processGetTree';
  try {
    const { currentTreeId } = query;
    // console.log("query", query, "currentTreeId", currentTreeId);
    const treeResults = await getTreeModel(currentTreeId);
    // logger.debug(`treeResults ${util.inspect(treeResults)} ${functionName}`);
    treeResults.healthNum = convertHealthToNumber(treeResults.health);
    // logger.debug(`treeResults ${util.inspect(treeResults)} ${functionName}`);
    responder(res, 200, await treeResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
  }
}

function convertHealthToNumber(health) {
  // console.log('convertHealthToNumber health', health);
  if (!health) return 6;
  const healthValue = {
    good: 6,
    fair: 5,
    poor: 4,
    stump: 3,
    missing: 2,
    dead: 1,
  }[health];
  return parseInt(healthValue);
}

function getTreeHistory(req, res) {
  const functionName = 'getTree';
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName}`);
  const validated = validateGetTreeHistory(req);
  if (!validated) {
    responder(res, 400, { error: 'trouble getting tree history' });
    return;
  }

  processGetTreeHistory(req.query, res);
}

async function processGetTreeHistory(query, res) {
  const functionName = 'processGetTree';
  try {
    const { currentTreeId } = query;
    let treeHistoryResults = await getTreeHistoryModel(currentTreeId);
    treeHistoryResults = (await treeHistoryResults && treeHistoryResults.length)
      ? treeHistoryResults
      : [];
    responder(res, 200, await treeHistoryResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
  }
}

async function processCopyNewData(query) {
  const functionName = 'processCopyNewData';
  try {
    logger.debug(`${functionName} query  ${util.inspect(query)} ${functionName}`);

    const keys = Object.keys(query);
    logger.debug('query ', query);
    const copyTreeData = await getTreetestModel(query);
    const insertTreeHistoryResults = await insertTreeHistoryModel(firstTreeHistory, keys);
    logger.debug('insertTreeHistoryResults ', await insertTreeHistoryResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function copyNewData(req, res) {
  const functionName = 'copyNewData';
  logger.debug(`req  ${util.inspect(req, false, 10, true)} ${functionName}`);
  const validated = validateGetMap(req);
  if (!validated) {
    logger.debug(`validated  ${validated} ${functionName}`);
    responder(res, 500, { error: 'not valid' });
    return;
  }
  logger.debug(`req  ${util.inspect(req.body, false, 10, true)} ${functionName}`);
  processCopyNewData(req.body, res);
}

function postTree(req, res) {
  const functionName = 'postTree';
  // logger.debug(`req  ${util.inspect(req, false, 10, true)} ${functionName}`);
  const validated = validatePostTree(req);
  if (!validated) {
    logger.debug(`validated  ${validated} ${functionName}`);
    responder(res, 500, { error: 'not valid' });
    return;
  }
  logger.debug(`req  ${util.inspect(req.body, false, 10, true)} ${functionName}`);
  processPostTree(req.body, res);
}

async function processFirstTreeHistory(insertTreeResults) {
  const functionName = 'processFirstTreeHistory';
  try {
    logger.debug(`${functionName}, "insertTreeResults",  ${util.inspect(insertTreeResults)} ${functionName}`);
    const firstTreeHistory = {
      id_tree: insertTreeResults.idtree,
      date_visit: insertTreeResults.datevisit,
      comment: `THIS ${insertTreeResults.common.toUpperCase()} IS PLANTED!!!`,
      volunteer: insertTreeResults.volunteer,
    };
    const keys = Object.keys(firstTreeHistory);
    logger.debug('firstTreeHistory ', firstTreeHistory);
    const insertTreeHistoryResults = await insertTreeHistoryModel(firstTreeHistory, keys);
    logger.debug('insertTreeHistoryResults ', await insertTreeHistoryResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

async function processPostTree(body, res) {
  const functionName = 'processPostTree';
  try {
    logger.debug(`${functionName} body ${util.inspect(body, false, 10, true)}`);
    const convertedTreeData = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeData);

    const insertTreeResults = await insertTreeModel(convertedTreeData, keys);
    logger.debug(`${functionName}, insertTreeResults, ${util.inspect(insertTreeResults)}`);
    if (!insertTreeResults) {
      responder(res, 500, { error: 'error saving' });
      return;
    }
    if (insertTreeResults.error) {
      responder(res, 500, insertTreeResults);
      return;
    }
    if (insertTreeResults.length !== 0) {
      processFirstTreeHistory(insertTreeResults[0]);
      console.log('body.city', body.city);
      const cityExists = getCityExistence(body.city);
      if (cityExists) {
        updateCitiesTreeCount(body.city);
      }
    }
    const returnMessage = body;
    responder(res, 200, { data: returnMessage });
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function updateTree(req, res) {
  const functionName = 'updateTree';
  logger.debug(`req  ${util.inspect(req, false, 10, true)} ${functionName}`);
  const validated = validateUpdateTree(req);
  if (!validated) {
    responder(res, 500, { error: 'not valid' });
    return;
  }
  logger.debug(`req.body  ${util.inspect(req.body, false, 10, true)} ${functionName}`);
  processUpdateTree(req.body, res);
}

async function processUpdateTree(body, res) {
  const functionName = 'processUpdateTree';
  try {
    const id_tree = body.idTree;
    const { idTree, ...subSetBody } = body;
    logger.debug(`${functionName} subSetBody ${util.inspect(subSetBody)}`);
    const convertedTreeData = convertObjectToSnakeCase(subSetBody);
    const keys = Object.keys(convertedTreeData);

    logger.info(`${functionName}, convertedTreeData, ${util.inspect(convertedTreeData)}`);
    const updateTreeResults = await updateTreeModel(convertedTreeData, keys, id_tree);
    // logger.debug(`${functionName}, updateTreeResults, ${util.inspect(updateTreeResults)}`)
    if (!updateTreeResults) {
      responder(res, 500, { error: 'error saving' });
      return;
    }
    if (updateTreeResults.error) {
      responder(res, 500, updateTreeResults);
      return;
    }
    const returnMessage = body.hasOwnProperty('notes')
      ? updateTreeResults[0].notes
      : updateTreeResults[0].health;
    responder(res, 200, { data: returnMessage });
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function postTreeHistory(req, res) {
  const functionName = 'postHistory';
  // logger.debug(`req  ${util.inspect(req.body)} ${functionName}`);
  const validated = validatePostTreeHistory(req);
  if (!validated) {
    responder(res, 500, { error: 'not valid' });
    return;
  }

  processPostTreeHistory(req.body, res);
}

async function processPostTreeHistory(body, res) {
  const functionName = 'processPostHistory';
  try {
    // logger.debug(`${functionName}, "body",  ${util.inspect(body)} ${functionName}`);
    const convertedTreeHistory = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeHistory);

    const findTreeHistoryVolunteerTodayResults = await findTreeHistoryVolunteerTodayModel(body);
    const { rowCount } = JSON.parse(JSON.stringify(findTreeHistoryVolunteerTodayResults));
    if (rowCount === 0) {
      const insertTreeHistoryResults = await insertTreeHistoryModel(convertedTreeHistory, keys);
      // logger.debug("insertTreeHistoryResults ", await insertTreeHistoryResults );
      if (!insertTreeHistoryResults) {
        responder(res, 500, { error: 'error saving' });
        return;
      }
      responder(res, 200, { data: await insertTreeHistoryResults[0] });
      return;
    }
    const updateTreeHistoryResults = await updateTreeHistoryModel(convertedTreeHistory, keys);
    // logger.debug(`updateTreeHistoryResults, ${await updateTreeHistoryResults} ${functionName}` );
    if (!updateTreeHistoryResults) {
      responder(res, 500, { error: 'error saving' });
      return;
    }
    responder(res, 200, { data: await updateTreeHistoryResults[0] });
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function getTreeList(req, res) {
  const functionName = 'getTreeList';
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName} HERE`);
  const validated = validateGetTreeList(req);
  // logger.debug(`validated ${util.inspect(validated)} ${functionName} HERE`);
  if (!validated) {
    responder(res, 400, { error: 'not a valid request' });
    return;
  }

  processGetTreeList(req.query.coordinates, res);
}

async function processGetTreeList(coordinates, res) {
  const functionName = 'processGetTreeList';
  try {
    const { lng, lat } = coordinates;
    const treeResults = await getTreeListModel(lng, lat);
    const sortedTreeResults = sortTrees(await treeResults);
    // const common = treeResults.map(elem => elem.common).filter(i => i);
    // logger.debug(`common ${util.inspect(common)} ${functionName}`);

    // const scientific = treeResults.map(elem => elem.scientific).filter(i => i);
    // logger.debug(`scientific ${util.inspect(scientific)} ${functionName}`);

    // const genus = treeResults.map(elem => elem.genus).filter(i => i);
    // logger.verbose(`sortedTreeResults ${util.inspect(await sortedTreeResults)} ${functionName}`);
    responder(res, 200, await sortedTreeResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
  }
}

const snakeToCamelCase = (snakeIn) => snakeIn.replace(/(\_\w)/g, (letter) => letter[1].toUpperCase());
const camelToSnakeCase = (camelIn) => camelIn.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

function convertObjectToSnakeCase(obj) {
  const newObj = {};
  for (const key in obj) {
    if (key == key.toLowerCase()) {
      newObj[key] = obj[key];
    } else {
      newObj[camelToSnakeCase(key)] = obj[key];
    }
  }
  return newObj;
}

function postUser(req, res) {
  const functionName = 'postUser';
  const validated = validatePostUser(req);
  if (!validated) {
    return responder(res, 400, { error: 'not a valid request' });
  }
  // logger.debug(`req.body ${util.inspect(req.body)} ${functionName} HERE`);
  return processPostUser(req.body, res);
}

async function processPostUser(body, res) {
  const functionName = 'processPostUser';
  try {
    logger.debug(`${functionName}, "body",  ${util.inspect(body)} ${functionName}`);
    const {
      email_verified, family_name, given_name, locale, sub, updated_at, ...subSetBody
    } = body;
    const keys = Object.keys(subSetBody);

    const findUserResults = await findUserModel(body);
    const { rowCount } = JSON.parse(JSON.stringify(findUserResults));
    // logger.debug(`${functionName} findUserResults${util.inspect(findUserResults)} rowCount ${rowCount}`);
    if (rowCount === 0) {
      const insertUserResults = await insertUserModel(subSetBody, keys);
      // logger.debug("insertUserResults ", await insertUserResults);
      if (!insertUserResults) {
        responder(res, 500, { error: 'error saving' });
        return;
      }
      responder(res, 200, { data: await insertUserResults[0] });
      return;
    }
    responder(res, 200, { data: subSetBody });
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function getUser(req, res) {
  const functionName = 'getUser';
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName} HERE`);
}

module.exports = {
  getMap,
  getTree,
  getTreeList,
  updateTree,
  postTree,
  getTreeHistory,
  postTreeHistory,
  postUser,
  getUser,
  copyNewData,
};
