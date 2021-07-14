const { inspect } = require('util');
const {
  getGeoJson,
  getTreeModel,
  getTreeListModel,
  getTreeHistoryModel,
  findUserModel,
  findTreeHistoryVolunteerTodayModel,
  getCities,
  updateCitiesTreeCount,
  insertNewCityModel,
  getCityExistence,
  findTreeAdoptionModel,
  findTreeLikesModel,
  deleteTreeAdoptionModel,
  deleteTreeLikesModel,
  findUserAdoptedTrees,
  findUserLikedTrees,
  findUserPlantedTrees,
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
  validateGetCities,
  validateGetTree,
  validateGetTreeHistory,
  validateUpdateTree,
  validatePostTree,
  validatePostUser,
  validatePostTreeHistory,
  validateGetTreeList,
  validatePostTreeUser,
  validateGetTreeUser,
  validateGetTodaysTrees,
  validateGetUserTreeHistory,
} = require('./validation.js');

const {
  sortTrees, convertObjectToSnakeCase,
  convertHealthToNumber,
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

async function processGetTodaysTrees(location, res) {
  const functionName = 'processGetTodaysTrees';
  try {
    const results = await getGeoJson(location);
    if ((await results) && has.call(results, 'rows') && results.rows.length > 0) {
      const resultsObject = results.rows[0].jsonb_build_object;
      res.statusCode = 200;
      res.json(await resultsObject);
      return resultsObject;
    }

    res.statusCode = 400;
    res.json({ error: 'failed to get cities' });
    return location;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return err;
  }
}

function getTodaysTrees(req, res) {
  const functionName = 'getTodaysTrees';
  const validated = validateGetTodaysTrees(req);
  if (!validated) {
    error(`NOT VALIDATED ${validated} ${functionName}`);
    responder(res, 400, { error: 'trouble getting cities' });
    return;
  }

  processGetTodaysTrees(req.query, res);
}

async function processGetCities(city, res) {
  const functionName = 'processGetCities';
  try {
    const citiesResults = await getCities();
    if ((await citiesResults) && has.call(citiesResults, 'rows') && citiesResults.rows.length > 0) {
      res.statusCode = 200;
      res.json(await citiesResults.rows);
      return citiesResults;
    }
    res.statusCode = 400;
    res.json({ error: 'failed to get cities' });
    return city;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return err;
  }
}

function getCitiesRequest(req, res) {
  const functionName = 'getCities';
  const validated = validateGetCities(req);
  if (!validated) {
    error(`NOT VALIDATED ${validated} ${functionName}`);
    responder(res, 400, { error: 'trouble getting cities' });
    return;
  }

  processGetCities(req.query.city, res);
}

async function processGetTree(query, res) {
  const functionName = 'processGetTree';
  try {
    const { currentTreeId } = query;
    const treeResults = await getTreeModel(currentTreeId);
    treeResults.healthNum = convertHealthToNumber(treeResults.health);
    responder(res, 200, await treeResults);
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
  }
}

function getTree(req, res) {
  // const functionName = 'getTree';
  const validated = validateGetTree(req);
  if (!validated) {
    responder(res, 400, { error: 'not a valid tree id' });
    return;
  }

  processGetTree(req.query, res);
}

async function processGetTreeHistory(query, res) {
  const functionName = 'processGetTreeHistory';
  try {
    const { currentTreeId } = query;
    let treeHistoryResults = await getTreeHistoryModel(currentTreeId);
    treeHistoryResults = (await treeHistoryResults && treeHistoryResults.length)
      ? treeHistoryResults : [];
    responder(res, 200, await treeHistoryResults);
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
  }
}

function getTreeHistory(req, res) {
  // const functionName = 'getTreeHistory';
  const validated = validateGetTreeHistory(req);
  if (!validated) {
    responder(res, 400, { error: 'trouble getting tree history' });
    return;
  }

  processGetTreeHistory(req.query, res);
}

async function processFirstTreeHistory(insertTreeResults, res) {
  const functionName = 'processFirstTreeHistory';
  try {
    const firstTreeHistory = {
      id_tree: insertTreeResults.idtree,
      date_visit: insertTreeResults.datevisit,
      comment: `THIS ${insertTreeResults.common.toUpperCase()} IS PLANTED!!!`,
      volunteer: insertTreeResults.volunteer,
    };
    const keys = Object.keys(firstTreeHistory);
    await insertTreeHistoryModel(firstTreeHistory, keys);
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

async function addNewCity(convertedTreeData) {
  const functionName = 'addNewCity';
  try {
    const {
      city, lng, lat, email, who,
    } = convertedTreeData;
    const cityExists = await getCityExistence(city);
    const cityRowCount = JSON.parse(JSON.stringify(cityExists)).rowCount;
    if (cityRowCount === 0) await insertNewCityModel(city, lng, lat, email, who);
    const newTreeCount = await updateCitiesTreeCount(city);
    return { newTreeCount };
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 3, false)}`);
    return err;
  }
}

async function processPostTree(body, res) {
  const functionName = 'processPostTree';
  try {
    const convertedTreeData = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeData);
    const insertTreeResults = await insertTreeModel(convertedTreeData, keys);
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
      addNewCity(convertedTreeData);
    }
    const returnMessage = body;
    responder(res, 200, { data: returnMessage });
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function postTree(req, res) {
  // const functionName = 'postTree';
  const validated = validatePostTree(req);
  if (!validated) {
    responder(res, 500, { error: 'not valid' });
    return;
  }
  processPostTree(req.body, res);
}

async function processUpdateTree(body, res) {
  const functionName = 'processUpdateTree';
  try {
    // eslint-disable-next-line camelcase
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
    // const returnMessage = Object.prototype.hasOwnProperty.call(body, 'notes')
    //   ? updateTreeResults[0].notes
    //   : updateTreeResults[0].health;
    responder(res, 200, { data: updateTreeResults[0] });
    return;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err });
  }
}

function updateTree(req, res) {
  // const functionName = 'updateTree';
  const validated = validateUpdateTree(req);
  if (!validated) {
    // debug(`validated  ${validated} ${functionName}`);
    responder(res, 500, { error: 'not valid' });
    return;
  }
  processUpdateTree(req.body, res);
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

      if (!insertTreeHistoryResults) {
        responder(res, 500, { error: 'error saving' });
        return;
      }
      responder(res, 200, { data: await insertTreeHistoryResults[0] });
      return;
    }
    const updateTreeHistoryResults = await updateTreeHistoryModel(convertedTreeHistory, keys);
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

function postTreeHistory(req, res) {
  const functionName = 'postHistory';
  const validated = validatePostTreeHistory(req);
  if (!validated) {
    responder(res, 500, { error: 'not valid' });
    return;
  }

  processPostTreeHistory(req.body, res);
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

function getTreeList(req, res) {
  // const functionName = 'getTreeList';
  // debug(`req.query ${inspect(req.query)} ${functionName} HERE`);
  const validated = validateGetTreeList(req);
  // debug(`validated ${inspect(validated)} ${functionName} HERE`);
  if (!validated) {
    responder(res, 500, { error: 'not valid' });
    return;
  }

  processGetTreeList(req.body, res);
}

async function processPostUser(body, res) {
  const functionName = 'processPostUser';
  try {
    // debug(`${functionName}, "body",  ${inspect(body)} ${functionName}`);
    const {
      // eslint-disable-next-line camelcase
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

function postUser(req, res) {
  // const functionName = 'postUser';
  const validated = validatePostUser(req);
  if (!validated) {
    return responder(res, 400, { error: 'not a valid request' });
  }
  // debug(`req.body ${inspect(req.body)} ${functionName} HERE`);
  return processPostUser(req.body, res);
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

async function processGetUserTreeHistory(email, res, findTreeUserModelCallback) {
  try {
    const results = await findTreeUserModelCallback(email);

    if (results.rowCount === 0) return responder(res, 200, {});

    return responder(res, 200, results.rows);
  } catch (err) {
    error(`CATCH ${processGetUserTreeHistory.name} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });

    return err;
  }
}

function getUserTreeHistory(req, res) {
  const validated = validateGetUserTreeHistory(req);

  if (!validated) return responder(res, 400, { error: 'not a valid request' });

  const { request, email } = req.query;
  let findTreeUserModelCallback = null;

  switch (request) {
    case 'adopted':
      findTreeUserModelCallback = findUserAdoptedTrees;
      break;
    case 'liked':
      findTreeUserModelCallback = findUserLikedTrees;
      break;
    case 'planted':
      findTreeUserModelCallback = findUserPlantedTrees;
      break;
    default:
      break;
  }

  processGetUserTreeHistory(email, res, findTreeUserModelCallback);
}

module.exports = {
  getTodaysTrees,
  getTree,
  getTreeList,
  updateTree,
  postTree,
  getTreeHistory,
  postTreeHistory,
  postUser,
  postTreeUser,
  getTreeUser,
  getCitiesRequest,
  getUserTreeHistory,
};
