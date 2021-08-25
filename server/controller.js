const { inspect } = require('util');
const { error } = require('../logger');
const { getGeoJson } = require('./models/models_treeme');
const { validateGetTodaysTrees } = require('./validation');

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

module.exports = {
  getTodaysTrees,
};
