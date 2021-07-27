const {
  // eslint-disable-next-line no-unused-vars
  info,
  verbose,
  debug,
  error,
} = require("../../logger.js");

const { inspect } = require("util");
const { responder } = require("./utils");
const { validateGetUserTreeHistory } = require("../validations/user-tree-history");
const { findUserTreeHistory } = require("../models/user-tree-history.js");

async function processGetUserTreeHistory(volunteer, res, findUserTreeHistory) {
  try {
    const results = await findUserTreeHistory(volunteer);
    const fixedResults = results.rows.map((obj) => {
      for (const key of Object.keys(obj)) {
        if (key != "dateVisit") {
          if (obj[key] === null) {
            obj[key] = false;
          } else {
            obj[key] = true;
          }
        }
      }
      return obj;
    });
    // if (results.rowCount === 0) return responder(res, 200, {});

    return responder(res, 200, fixedResults);
  } catch (err) {
    error(`CATCH ${processGetUserTreeHistory.name} ${inspect(err, false, 10, true)}`);
    responder(res, 500, { error: err.message });

    return err;
  }
}

function getUserTreeHistory(req, res) {
  const validated = validateGetUserTreeHistory(req);

  if (!validated) return responder(res, 400, { error: "not a valid request" });

  const { volunteer } = req.query;

  processGetUserTreeHistory(volunteer, res, findUserTreeHistory);
}

module.exports = {
  getUserTreeHistory,
};
