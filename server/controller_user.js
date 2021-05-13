const { inspect } = require('util');
const {
  countUserTreeModel,
  getUserTreehistoryModel,
} = require('./models/models_userprofile.js');

const {
  validateCountUserTree,
  validateGetUserTreehistory,
} = require('./validation.js');

const { info, error } = require('../logger.js');

const has = Object.prototype.hasOwnProperty;

function responder(res, code, message) {
  // const functionName = 'responder';
  res.statusCode = code;
  res.json(message);
}

function getIdString(request) {
  return {
    treelikes: 'id_liked',
    treeadoption: 'id_adopted',
    treedata: 'id_tree',
  }[request];
}

async function processCountUserTree(query, res) {
  const functionName = 'processCountUserTree';
  try {
    const { request, user } = query;
    const id = getIdString(request);
    const results = await countUserTreeModel(user, request, id);
    if ((await results) && has.call(results, 'rows') && results.rows.length > 0) {
      info(await results, true, 10, true);
      const resultsObject = results.rows;
      res.statusCode = 200;
      res.json(await resultsObject);
      return resultsObject;
    }

    res.statusCode = 400;
    res.json({ error: 'failed to get count' });
    return location;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return err;
  }
}

function countUserTree(req, res) {
  const functionName = 'countUserTree';
  const validated = validateCountUserTree(req);
  if (!validated) {
    error(`NOT VALIDATED ${validated} ${functionName}`);
    responder(res, 400, { error: 'NOT VALID' });
    return;
  }

  processCountUserTree(req.query, res);
}

async function processGetUserTreehistory(query, res) {
  const functionName = 'processGetUserTreehistory';
  try {
    const { user } = query;
    const results = await getUserTreehistoryModel(user);
    if ((await results) && has.call(results, 'rows') && results.rows.length > 0) {
      info(await results, true, 10, true);
      const resultsObject = results.rows;
      res.statusCode = 200;
      res.json(await resultsObject);
      return resultsObject;
    }

    res.statusCode = 400;
    res.json({ error: 'failed to get User\'s Tree History.' });
    return query;
  } catch (err) {
    error(`CATCH ${functionName} ${inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return err;
  }
}

function getUserTreehistory(req, res) {
  const functionName = 'getUserTreehistory';
  const validated = validateGetUserTreehistory(req);
  if (!validated) {
    error(`NOT VALIDATED ${validated} ${functionName}`);
    responder(res, 400, { error: 'NOT VALID' });
    return;
  }

  processGetUserTreehistory(req.query, res);
}

module.exports = { countUserTree, getUserTreehistory };
