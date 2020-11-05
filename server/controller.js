const {
  getGeoJson,
  getTreeModel,
  getTreeListModel,
  getTreeHistoryModel,
  findTreeHistoryVolunteerTodayModel,
} = require('./models/models_treeme.js');

const {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
  updateTreeModel,
  insertTreeModel
} = require('./models/models_wtt.js');

const {
  validateGetMap,
  validateGetTree,
  validateGetTreeHistory,
  validateUpdateTree,
  validatePostTree,
  validatePostTreeHistory,
  validateGetTreeList
} = require('./validation.js');

const { sortTrees } = require('./utilities.js');

const { logger } = require('./../logger.js');
util = require('util');
const has = Object.prototype.hasOwnProperty;

function getMap(req, res) {
  const functionName = "getMap";
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName}`);

  const validated = validateGetMap(req);
  if (!validated) {
    responder(res, 400, { error: 'trouble getting map' });
    return;
  }

  processGetMap(req.query, res);
  return;
}

async function processGetMap(query, res) {
  const functionName = 'processGetMap';
  try {
    let treeMapResults = await getGeoJson(query);
    if ((await treeMapResults) && has.call(treeMapResults, "rows") && treeMapResults.rows.length > 0) {
      const treeMapResultsObject = treeMapResults.rows[0].jsonb_build_object;
      res.statusCode = 200;
      res.json(await treeMapResultsObject);
    }

    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return;
  }
}

function getTree(req, res) {
  const functionName = "getTree";
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName} HERE`);
  const validated = validateGetTree(req);
  if (!validated) {
    responder(res, 400, { error: 'not a valid tree id' });
    return;
  }

  processGetTree(req.query, res);
  return;
}

async function processGetTree(query, res) {
  const functionName = "processGetTree";
  try {
    const { currentTreeId } = query;
    // console.log("query", query, "currentTreeId", currentTreeId);
    let treeResults = await getTreeModel(currentTreeId);
    // logger.debug(`treeResults ${util.inspect(treeResults)} ${functionName}`);
    treeResults.healthNum = convertHealthToNumber(treeResults.health);
    // logger.debug(`treeResults ${util.inspect(treeResults)} ${functionName}`);
    responder(res, 200, await treeResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return;
  }
}

function convertHealthToNumber(health) {
  // console.log('convertHealthToNumber health', health);
  const healthValue = {
    good: 6,
    fair: 5,
    poor: 4,
    stump: 3,
    missing: 2,
    dead: 1
  }[health];
  return parseInt(healthValue);
}

function getTreeHistory(req, res) {
  const functionName = "getTree";
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName}`);
  const validated = validateGetTreeHistory(req);
  if (!validated) {
    responder(res, 400, { error: 'trouble getting tree history' });
    return;
  }

  processGetTreeHistory(req.query, res);
  return;
}

async function processGetTreeHistory(query, res) {
  const functionName = "processGetTree";
  try {
    const { currentTreeId } = query;
    let treeHistoryResults = await getTreeHistoryModel(currentTreeId);
    // console.log("query", query, "currentTreeId", currentTreeId, 'treeHistoryResults1', treeHistoryResults);
    treeHistoryResults = (await treeHistoryResults && treeHistoryResults.length) ? treeHistoryResults : []
    // console.log("query", query, "currentTreeId", currentTreeId, 'treeHistoryResults2', treeHistoryResults);
    responder(res, 200, await treeHistoryResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return;
  }
}

function postTree(req, res) {
  const functionName = "postTree";
  // logger.debug(`req  ${util.inspect(req, false, 10, true)} ${functionName}`);
  const validated = validatePostTree(req);
  if (!validated) {
    responder(res, 500, { error: 'not valid' });
    return;
  }
  // logger.debug(`req  ${util.inspect(req.body, false, 10, true)} ${functionName}`);
  processPostTree(req.body, res);
  return;
}

async function processPostTree(body, res) {
  const functionName = "processPostTree";
  try {
    logger.debug(`${functionName} body ${util.inspect(body, false, 10, true)}`);
    const convertedTreeData = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeData);

    const insertTreeResults = await insertTreeModel(convertedTreeData, keys);
    logger.debug(`${functionName}, insertTreeResults, ${util.inspect(insertTreeResults)}`)
    if (!insertTreeResults) {
      responder(res, 500, { error: 'error saving' });
      return;
    }
    if (insertTreeResults.error) {
      responder(res, 500, insertTreeResults);
      return;
    }
    const returnMessage = body;
    responder(res, 200, { data: returnMessage });
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
    return;
  }
}


function updateTree(req, res) {
  const functionName = "updateTree";
  logger.debug(`req  ${util.inspect(req, false, 10, true)} ${functionName}`);
  const validated = validatePostTree(req);
  if (!validated) {
    responder(res, 500, { error: 'not valid' });
    return;
  }

  processUpdateTree(req.body, res);
  return;
}

async function processUpdateTree(body, res) {
  const functionName = "processUpdateTree";
  try {
    logger.debug(`${functionName} body ${util.inspect(body)}`);
    const convertedTreeData = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeData);

    const updateTreeResults = await updateTreeModel(convertedTreeData, keys);
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
    return;
  }
}


function postTreeHistory(req, res) {
  const functionName = "postHistory";
  // logger.debug(`req  ${util.inspect(req.body)} ${functionName}`);
  const validated = validatePostTreeHistory(req);
  if (!validated) {
    responder(res, 500, { error: 'not valid' });
    return;
  }

  processPostTreeHistory(req.body, res);
  return;
}

async function processPostTreeHistory(body, res) {
  const functionName = "processPostHistory";
  try {
    // logger.debug(`${functionName}, "body",  ${util.inspect(body)} ${functionName}`);
    const convertedTreeHistory = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeHistory);

    const findTreeHistoryVolunteerTodayResults = await findTreeHistoryVolunteerTodayModel(body);
    const rowCount = JSON.parse(JSON.stringify(findTreeHistoryVolunteerTodayResults)).rowCount;
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
    return;
  }
}

function getTreeList(req, res) {
  const functionName = "getTreeList";
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName} HERE`);
  const validated = validateGetTreeList(req);
  // logger.debug(`validated ${util.inspect(validated)} ${functionName} HERE`);
  if (!validated) {
    responder(res, 400, { error: 'not a valid request' });
    return;
  }

  processGetTreeList(req.query.coordinates, res);
  return;
}

async function processGetTreeList(coordinates, res) {
  const functionName = "processGetTreeList";
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
    return;
  }
}

const snakeToCamelCase = (snakeIn) => snakeIn.replace(/(\_\w)/g, (letter) => letter[1].toUpperCase());
const camelToSnakeCase = (camelIn) => camelIn.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

function convertObjectToSnakeCase(obj) {
  const newObj = {}
  for (let key in obj) {
    if (key == key.toLowerCase()) {
      newObj[key] = obj[key];
    } else {
      newObj[camelToSnakeCase(key)] = obj[key];
    }
  }
  return newObj;
}

function responder(res, code, message) {
  const functionName = "responder";
  res.statusCode = code;
  res.json(message);
}

module.exports = { getMap, getTree, getTreeList, updateTree, postTree, getTreeHistory, postTreeHistory };
