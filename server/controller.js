const { inspect } = require('util');
const {
  // eslint-disable-next-line no-unused-vars
  info,
  verbose,
  debug,
  error,
} = require('../logger.js');
const {
  getGeoJson,
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
  insertUserModel,
  insertTreeAdoptionModel,
  insertTreeLikesModel,
  // updateTreeUserModel,
} = require('./models/models_wtt.js');
const { sortTrees, convertObjectToSnakeCase } = require('./utilities.js');
const {
  validateGetTreeHistory,
  validatePostUser,
  validatePostTreeHistory,
  validateGetTreeList,
  validatePostTreeUser,
  validateGetTreeUser,
  validateGetTodaysTrees,
} = require('./validation.js');

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
    if (
      (await results) &&
      has.call(results, 'rows') &&
      results.rows.length > 0
    ) {
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

async function processGetTreeHistory(query, res) {
  const functionName = 'processGetTreeHistory';
  try {
    const { currentTreeId } = query;
    let treeHistoryResults = await getTreeHistoryModel(currentTreeId);
    treeHistoryResults =
      (await treeHistoryResults) && treeHistoryResults.length
        ? treeHistoryResults
        : [];
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

async function processPostTreeHistory(body, res) {
  const functionName = 'processPostHistory';
  try {
    // info(`${functionName}, "body",  ${inspect(body)} ${functionName}`);
    const convertedTreeHistory = convertObjectToSnakeCase(body);
    const keys = Object.keys(convertedTreeHistory);

    // eslint-disable-next-line max-len
    const findTreeHistoryVolunteerTodayResults =
      await findTreeHistoryVolunteerTodayModel(convertedTreeHistory);
    const { rowCount } = JSON.parse(
      JSON.stringify(findTreeHistoryVolunteerTodayResults)
    );
    if (rowCount === 0) {
      const insertTreeHistoryResults = await insertTreeHistoryModel(
        convertedTreeHistory,
        keys
      );

      if (!insertTreeHistoryResults) {
        responder(res, 500, { error: 'error saving' });
        return;
      }
      responder(res, 200, { data: await insertTreeHistoryResults[0] });
      return;
    }
    const updateTreeHistoryResults = await updateTreeHistoryModel(
      convertedTreeHistory,
      keys
    );
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
      email_verified,
      family_name,
      given_name,
      locale,
      sub,
      updated_at,
      ...subSetBody
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

async function processPostTreeUser(
  body,
  res,
  processPostTreeUserCallback,
  request
) {
  try {
    if (request.type === 'DELETE') {
      const { rowCount } = await processPostTreeUserCallback(body);

      if (rowCount === 1) return responder(res, 200, [body]);
    } else {
      const formattedBody = convertObjectToSnakeCase(body);
      const data = await processPostTreeUserCallback(formattedBody);

      if (data.length === 1) return responder(res, 200, data);
    }

    return responder(res, 400, {
      error: `could not find the tree with id ${body.idTree}`,
    });
  } catch (err) {
    error(`CATCH ${processPostTreeUser.name} ${inspect(err, false, 10, true)}`);

    return responder(res, 500, `${err.name}: ${err.message}`);
  }
}

function getProcessPostTreeUserCallback(request) {
  if (request.name === 'adopted') {
    return request.type === 'POST'
      ? insertTreeAdoptionModel
      : deleteTreeAdoptionModel;
  }

  return request.type === 'POST' ? insertTreeLikesModel : deleteTreeLikesModel;
}

function postTreeUser(req, res) {
  const validated = validatePostTreeUser(req);

  if (!validated) return responder(res, 400, { error: 'not a valid request' });

  const { request, ...body } = req.body;
  const processPostTreeUserCallback = getProcessPostTreeUserCallback(request);

  return processPostTreeUser(body, res, processPostTreeUserCallback, request);
}

async function processGetTreeUser(findTreeUserModelCallback, query, res) {
  const { idTree, email, request } = query;

  try {
    const { rows } = await findTreeUserModelCallback(idTree);

    if (rows === undefined)
      return responder(res, 400, {
        error: `could not find the tree with id ${idTree}`,
      });

    const data = {
      [request]: rows.some((row) => row.email === email),
      [`${request}Count`]: rows.length,
    };

    return responder(res, 200, data);
  } catch (err) {
    error(`CATCH ${processGetTreeUser.name} ${inspect(err, false, 10, true)}`);

    return responder(res, 500, `${err.name}: ${err.message}`);
  }
}

function getTreeUser(req, res) {
  const validated = validateGetTreeUser(req);

  if (!validated) return responder(res, 400, { error: 'not a valid request' });

  const findTreeUserModelCallback =
    req.query.request === 'adopted'
      ? findTreeAdoptionModel
      : findTreeLikesModel;

  return processGetTreeUser(findTreeUserModelCallback, req.query, res);
}

module.exports = {
  getTodaysTrees,
  getTreeList,
  getTreeHistory,
  postTreeHistory,
  postUser,
  postTreeUser,
  getTreeUser,
};
