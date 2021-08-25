const { inspect } = require('util');
const { error } = require('../logger');
const { getGeoJson, findUserModel } = require('./models/models_treeme');
const { insertUserModel } = require('./models/models_wtt');
const { validatePostUser, validateGetTodaysTrees } = require('./validation');

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

module.exports = {
  getTodaysTrees,
  postUser,
};
