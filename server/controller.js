const {
  getGeoJson,
  getTreeModel,
  getTreeHistoryModel,
  findTreeHistoryVolunteerTodayModel,
} = require('./models/models_treeme.js');

const {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
  updateTreeModel
} = require('./models/models_wtt.js');

const { 
  validateGetMap, 
  validateGetTree, 
  validateGetTreeHistory, 
  validatePostTree,
  validatePostTreeHistory 
} = require('./validation.js');

const { logger } = require('./../logger.js');
util = require('util');
const has = Object.prototype.hasOwnProperty;

function getMap(req, res) {
  const functionName = "getMap";
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName}`);

 const validated = validateGetMap(req);
  if (!validated) {
    responder(res, 400, {error: 'trouble getting map'});
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
    responder(res, 400, {error: 'not a valid tree id'});
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
    responder(res, 200, await treeResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return;
  }
}

function getTreeHistory(req, res) {
  const functionName = "getTree";
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName}`);
 const validated = validateGetTreeHistory(req);
  if (!validated) {
    responder(res, 400, {error: 'trouble getting tree history'});
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

  processPostTree(req.body, res);
  return;
}

async function processPostTree(body, res) {
  const functionName = "processPostTree";
  try {
    // logger.debug(`${functionName} body ${util.inspect(body)}`);
    const convertedTreeData = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeData);

    const updateTreeResults = await updateTreeModel(convertedTreeData, keys);
    // logger.debug(`${functionName}, updateTreeResults, ${util.inspect(updateTreeResults)}`)
    if (!updateTreeResults) {
      responder(res, 500, {error: 'error saving'});
      return;
    }
    if (updateTreeResults.error) {
      responder(res, 500, updateTreeResults);
      return;
    }
    const returnMessage = body.hasOwnProperty('notes') 
      ? updateTreeResults[0].notes
      : updateTreeResults[0].health;
    responder(res, 200, {data: returnMessage});
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
  try{
    // logger.debug(`${functionName}, "body",  ${util.inspect(body)} ${functionName}`);
    const convertedTreeHistory = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeHistory);

    const findTreeHistoryVolunteerTodayResults = await findTreeHistoryVolunteerTodayModel(body);
    const rowCount = JSON.parse(JSON.stringify(findTreeHistoryVolunteerTodayResults)).rowCount;
    if (rowCount === 0) {
      const insertTreeHistoryResults = await  insertTreeHistoryModel(convertedTreeHistory, keys);
      // logger.debug("insertTreeHistoryResults ", await insertTreeHistoryResults );
      if (!insertTreeHistoryResults) {
        responder(res, 500, {error: 'error saving'});
        return;
      }
      responder(res, 200, {data: await insertTreeHistoryResults[0]});
      return;
    } 
    const updateTreeHistoryResults = await  updateTreeHistoryModel(convertedTreeHistory, keys);
    // logger.debug(`updateTreeHistoryResults, ${await updateTreeHistoryResults} ${functionName}` );
    if (!updateTreeHistoryResults) {
      responder(res, 500, {error: 'error saving'});
      return;
    }
    responder(res, 200, {data: await updateTreeHistoryResults[0]});
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
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

module.exports = { getMap, getTree, postTree, getTreeHistory, postTreeHistory };
