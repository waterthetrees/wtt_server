const {
  // eslint-disable-next-line no-unused-vars
  info, verbose, debug, error,
} = require('../../logger.js');

const { inspect } = require('util');
const { responder } = require('./utils');
const {
  findUserAdoptedTrees,
  findUserLikedTrees,
  findUserPlantedTrees,
} = require('../models/user-counts');
const { validateGetUserCounts } = require('../validations/user-counts');

async function processGetUserCounts(email, res, findTreeUserModelCallback) {
  try {
    const results = await findTreeUserModelCallback(email);

    if (results.rowCount === 0) return responder(res, 200, {});

    return responder(res, 200, results.rows);
  } catch (err) {
    error(`CATCH ${processGetUserCounts.name} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err.message });

    return err;
  }
}

function getUserCounts(req, res) {
  const validated = validateGetUserCounts(req);

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

  processGetUserCounts(email, res, findTreeUserModelCallback);
}

module.exports = {
  getUserCounts,
};
