const { inspect } = require('util');
const {
  getGeoJson,
  getTreeModel,
  getTreeListModel,
  getTreeHistoryModel,
  findUserModel,
  findTreeHistoryVolunteerTodayModel,
  findTreeAdoptionModel,
  findTreeLikesModel,
  deleteTreeAdoptionModel,
  deleteTreeLikesModel,
} = require('./models/models_treeme.js');

const {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
  updateTreeModel,
  insertTreeModel,
  insertUserModel,
  insertTreeAdoptionModel,
  insertTreeLikesModel,
  // updateTreeUserModel,
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
  validatePostTreeUser,
  validateGetTreeUser,
} = require('./validation.js');

const {
  sortTrees, convertObjectToSnakeCase,
} = require('./utilities.js');

const {
  // eslint-disable-next-line no-unused-vars
  info, verbose, debug, error,
} = require('../logger.js');

const has = Object.prototype.hasOwnProperty;

function responder(res, code, message) {
  // const functionName = 'responder';
  res.statusCode = code;
  res.json(message);
}

function getMap(req, res) {
  // const functionName = 'getMap';
  // debug(`req.query ${inspect(req.query)} ${functionName}`);

  const validated = validateGetMap(req);
  if (!validated) {
    responder(res, 400, { error: 'trouble getting map' });
    return;
  }

  processGetMap(req.query, res);
}

async function processGetMap(query, res) {
  const functionName = 'processGetMap';
  try {
    const treeMapResults = await getGeoJson(query);
    if ((await treeMapResults) && has.call(treeMapResults, 'rows') && treeMapResults.rows.length > 0) {
      const treeMapResultsObject = treeMapResults.rows[0].jsonb_build_object;
      res.statusCode = 200;
      res.json(await treeMapResultsObject);
    }

    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
  }
}

function getTree(req, res) {
  const functionName = 'getTree';
  // debug(`req.query ${inspect(req.query)} ${functionName} HERE`);
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
    // debug(`treeResults ${inspect(treeResults)} ${functionName}`);
    treeResults.healthNum = convertHealthToNumber(treeResults.health);
    // debug(`treeResults ${inspect(treeResults)} ${functionName}`);
    responder(res, 200, await treeResults);
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
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
    vacant: 0,
  }[health];
  return parseInt(healthValue);
}

function getTreeHistory(req, res) {
  const functionName = 'getTree';
  // debug(`req.query ${inspect(req.query)} ${functionName}`);
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
    // console.log("query", query, "currentTreeId", currentTreeId, 'treeHistoryResults1', treeHistoryResults);
    treeHistoryResults = (await treeHistoryResults && treeHistoryResults.length) ? treeHistoryResults : [];
    // console.log("query", query, "currentTreeId", currentTreeId, 'treeHistoryResults2', treeHistoryResults);
    responder(res, 200, await treeHistoryResults);
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
  }
}

function postTree(req, res) {
  const functionName = 'postTree';
  // debug(`req  ${inspect(req, false, 10, true)} ${functionName}`);
  const validated = validatePostTree(req);
  if (!validated) {
    // debug(`validated  ${validated} ${functionName}`);
    responder(res, 500, { error: 'not valid' });
    return;
  }
  // debug(`req  ${inspect(req.body, false, 10, true)} ${functionName}`);
  processPostTree(req.body, res);
}

async function processFirstTreeHistory(insertTreeResults) {
  const functionName = 'processFirstTreeHistory';
  try {
    // debug(`${functionName}, "insertTreeResults",  ${inspect(insertTreeResults)} ${functionName}`);
    const firstTreeHistory = {
      id_tree: insertTreeResults.idtree,
      date_visit: insertTreeResults.datevisit,
      comment: `THIS ${insertTreeResults.common.toUpperCase()} IS PLANTED!!!`,
      volunteer: insertTreeResults.volunteer,
    };
    const keys = Object.keys(firstTreeHistory);
    // debug('firstTreeHistory ', firstTreeHistory);
    const insertTreeHistoryResults = await insertTreeHistoryModel(firstTreeHistory, keys);
    // debug('insertTreeHistoryResults ', await insertTreeHistoryResults);
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

async function processPostTree(body, res) {
  const functionName = 'processPostTree';
  try {
    // debug(`${functionName} body ${inspect(body, false, 10, true)}`);
    const convertedTreeData = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeData);

    const insertTreeResults = await insertTreeModel(convertedTreeData, keys);
    // info(`${functionName}, insertTreeResults, ${inspect(insertTreeResults)}`);
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
    }
    const returnMessage = body;
    responder(res, 200, { data: returnMessage });
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function updateTree(req, res) {
  const functionName = 'updateTree';
  // debug(`req  ${inspect(req.body, false, 10, true)} ${functionName}`);
  const validated = validateUpdateTree(req);
  if (!validated) {
    responder(res, 500, { error: 'not valid' });
    return;
  }
  // debug(`req.body  ${inspect(req.body, false, 10, true)} ${functionName}`);
  processUpdateTree(req.body, res);
}

async function processUpdateTree(body, res) {
  const functionName = 'processUpdateTree';
  try {
    const id_tree = body.idTree;
    const { idTree, ...subSetBody } = body;
    // debug(`${functionName} subSetBody ${inspect(subSetBody)}`);
    const convertedTreeData = convertObjectToSnakeCase(subSetBody);
    const keys = Object.keys(convertedTreeData);

    // info(`${functionName}, convertedTreeData, ${inspect(convertedTreeData)}`);
    const updateTreeResults = await updateTreeModel(convertedTreeData, keys, id_tree);
    // info(`${functionName}, updateTreeResults, ${inspect(updateTreeResults)}`);
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
    // info(`${functionName}, returnMessage ${inspect(returnMessage)}`);
    responder(res, 200, { data: updateTreeResults[0] });
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function postTreeHistory(req, res) {
  const functionName = 'postHistory';
  // debug(`req  ${inspect(req.body)} ${functionName}`);
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
    // info(`${functionName}, "body",  ${inspect(body)} ${functionName}`);
    const convertedTreeHistory = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeHistory);

    // eslint-disable-next-line max-len
    const findTreeHistoryVolunteerTodayResults = await findTreeHistoryVolunteerTodayModel(convertedTreeHistory);
    const { rowCount } = JSON.parse(JSON.stringify(findTreeHistoryVolunteerTodayResults));
    if (rowCount === 0) {
      const insertTreeHistoryResults = await insertTreeHistoryModel(convertedTreeHistory, keys);
      // debug(functionName, 'insertTreeHistoryResults ', await insertTreeHistoryResults);
      if (!insertTreeHistoryResults) {
        // debug('!insertTreeHistoryResults error saving');
        responder(res, 500, { error: 'error saving' });
        return;
      }
      responder(res, 200, { data: await insertTreeHistoryResults[0] });
      return;
    }
    const updateTreeHistoryResults = await updateTreeHistoryModel(convertedTreeHistory, keys);
    // debug(`updateTreeHistoryResults, ${await updateTreeHistoryResults} ${functionName}` );
    if (!updateTreeHistoryResults) {
      responder(res, 500, { error: 'error saving' });
      return;
    }
    responder(res, 200, { data: await updateTreeHistoryResults[0] });
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function getTreeList(req, res) {
  const functionName = 'getTreeList';
  // debug(`req.query ${inspect(req.query)} ${functionName} HERE`);
  const validated = validateGetTreeList(req);
  // debug(`validated ${inspect(validated)} ${functionName} HERE`);
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
    // debug(`common ${inspect(common)} ${functionName}`);

    // const scientific = treeResults.map(elem => elem.scientific).filter(i => i);
    // debug(`scientific ${inspect(scientific)} ${functionName}`);

    // const genus = treeResults.map(elem => elem.genus).filter(i => i);
    // verbose(`sortedTreeResults ${inspect(await sortedTreeResults)} ${functionName}`);
    responder(res, 200, await sortedTreeResults);
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
  }
}

function postUser(req, res) {
  const functionName = 'postUser';
  const validated = validatePostUser(req);
  if (!validated) {
    return responder(res, 400, { error: 'not a valid request' });
  }
  // debug(`req.body ${inspect(req.body)} ${functionName} HERE`);
  return processPostUser(req.body, res);
}

async function processPostUser(body, res) {
  const functionName = 'processPostUser';
  try {
    // debug(`${functionName}, "body",  ${inspect(body)} ${functionName}`);
    const {
      email_verified, family_name, given_name, locale, sub, updated_at, ...subSetBody
    } = body;
    const keys = Object.keys(subSetBody);

    const findUserResults = await findUserModel(body);
    const { rowCount } = JSON.parse(JSON.stringify(findUserResults));
    // debug(`${functionName} findUserResults${inspect(findUserResults)} rowCount ${rowCount}`);
    if (rowCount === 0) {
      const insertUserResults = await insertUserModel(subSetBody, keys);
      // debug("insertUserResults ", await insertUserResults);
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
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function getUser(req, res) {
  const functionName = 'getUser';
  // debug(`req.query ${inspect(req.query)} ${functionName} HERE`);
}

async function processPostTreeUser(body, res,
  findTreeUserModelCallback, setTreeUserModelCallback, request) {
  const functionName = 'processPostTreeUser';
  try {
    const convertedToSnake = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedToSnake);

    const findResults = await findTreeUserModelCallback(convertedToSnake);
    const findResultsJSON = JSON.parse(JSON.stringify(findResults));
    if (findResultsJSON.rowCount !== 0 && request[request.name] === true) {
      return responder(res, 200, await findResultsJSON.rows[0]);
    }
    const insertObj = (request.type === 'DELETE') ? findResultsJSON.rows[0] : convertedToSnake;
    const insertResults = await setTreeUserModelCallback(insertObj, keys);
    const insertResultsJSON = JSON.parse(JSON.stringify(insertResults));
    if (!insertResults) {
      return responder(res, 500, { error: 'error saving' });
    }
    const requestType = request.type === 'POST';
    const returnData = request.type === 'POST' ? await insertResultsJSON[0] : {};
    const sendResult = { ...await returnData, ...{ [request.name]: requestType } };
    return responder(res, 200, await sendResult);
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 4, true)}`);
    return responder(res, 500, { error: err });
  }
}

function setTreeUserCallBack(request) {
  const callbackName = {
    adopted: (request.adopted) ? insertTreeAdoptionModel : deleteTreeAdoptionModel,
    liked: (request.liked) ? insertTreeLikesModel : deleteTreeLikesModel,
  }[request.name];
  return callbackName;
}

function postTreeUser(req, res) {
  // const functionName = 'postTreeUser';
  const validated = validatePostTreeUser(req);
  if (!validated) {
    return responder(res, 400, { error: 'not a valid request1' });
  }
  const { request, ...body } = req.body;
  const findTreeUserModelCallback = (request.name === 'adopted')
    ? findTreeAdoptionModel
    : findTreeLikesModel;
  const setTreeUserModelCallback = setTreeUserCallBack(request);
  return processPostTreeUser(body, res,
    findTreeUserModelCallback, setTreeUserModelCallback, request);
}

async function processGetTreeUser(query, res, findTreeUserModelCallback, request) {
  const functionName = 'processGetTreeUser';
  try {
    const convertedToSnake = convertObjectToSnakeCase(query);
    const findResults = await findTreeUserModelCallback(convertedToSnake);
    const resultsJSON = JSON.parse(JSON.stringify(findResults));

    if (resultsJSON.rowCount === 0) return responder(res, 200, { [request]: false });
    const sendResult = { ...await resultsJSON.rows[0], ...{ [request]: true } };
    return responder(res, 200, await sendResult);
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return err;
  }
}

function getTreeUser(req, res) {
  // const functionName = 'getTreeUser';
  const validated = validateGetTreeUser(req);
  if (!validated) {
    responder(res, 400, { error: 'not a valid request' });
    return;
  }
  const { request, ...query } = req.query;
  const findTreeUserModelCallback = (request === 'adopted')
    ? findTreeAdoptionModel
    : findTreeLikesModel;
  processGetTreeUser(query, res, findTreeUserModelCallback, request);
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
  postTreeUser,
  getTreeUser,
};
