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

const { validateGetMapRequest } = require('./validation.js');
const { logger } = require('./../logger.js');
util = require('util');
const has = Object.prototype.hasOwnProperty;

function getMap(req, res) {
  const functionName = "getMap";
  // logger.debug(`req.params  ${util.inspect(req.params)}${functionName} $date`);
  // logger.debug(`req.query ${util.inspect(req.query)} ${functionName}`);

  // const validated = validateGetMapRequest(req);
  // if (!validated) {
  //   res.statusCode = 400;
  //   res.json({'error': 'not valid'});
  //   return;
  // }

  processGetMap(req.query, res);
  return;
}

async function processGetMap(query, res) {
  const functionName = 'processGetMap';
  try {
    let treeMapResults = await getGeoJson(query);
    // let treeResults = (query.requestType === 'GetMapSubset') ? await getMapSubsetModel(await query) : await getMapByCityModel(await query);
    // console.log('\n\n\n\ntreeResults', await treeMapResults.rows, 'treeMapResults\n\n\n\n');
    // TODO figure out a sort so south trees will be above north trees
    // treeResults = await results.sort((a, b) => a.latitude < b.latitude);
    if ((await treeMapResults) && has.call(treeMapResults, "rows") && treeMapResults.rows.length > 0) {
      // console.debug(`${functionName} results.rows[0].jsonb_build_object ${util.inspect(treeMapResults.rows[0].jsonb_build_object, false, 10, true)}`);
      const treeMapResultsObject = treeMapResults.rows[0].jsonb_build_object;
      res.statusCode = 200;
      // res.send({data: await treeResults});
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
  logger.debug(`req  ${util.inspect(req.query)} ${functionName} HERE`);

  // const validated = validateGetMapRequest(req);
  // if (!validated) {
  //   res.statusCode = 400;
  //   res.json({'error': 'not valid'});
  //   return;
  // }

  processGetTree(req.query, res);
  return;
}

async function processGetTree(query, res) {
  const functionName = "processGetTree";
  try {
    const { currentTreeId } = query;
    console.log("query", query, "currentTreeId", currentTreeId);
    let treeResults = await getTreeModel(currentTreeId);
    logger.debug(`treeResults ${util.inspect(treeResults)} ${functionName}`);
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
  processGetTreeHistory(req.query, res);
  return;
}

async function processGetTreeHistory(query, res) {
  const functionName = "processGetTree";
  try {
    const { currentTreeId } = query;
    console.log("query", query, "currentTreeId", currentTreeId);
    let treeHistoryResults = await getTreeHistoryModel(currentTreeId);
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

  // const validated = validateGetMapRequest(req);
  // if (!validated) {
  //   responder(res, 500, { error: 'not valid' });
  //   return;
  // }
  processPostTree(req.body, res);
  return;
}

async function processPostTree(body, res) {
  const functionName = "processPostTree";
  try {

    logger.debug(`${functionName} body ${util.inspect(body)}`);
    const updateTreeResults = await updateTreeModel(body, 'test');
    logger.debug(`${functionName}, updateTreeResults, ${util.inspect(updateTreeResults)}`)
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
  logger.debug(`req  ${util.inspect(req.body, false, 10, true)} ${functionName}`);

  // const validated = validateGetMapRequest(req);
  // if (!validated) {
  //   res.statusCode = 400;
  //   res.json({'error': 'not valid'});
  //   return;
  // }

  processPostTreeHistory(req.body, res);
  return;
}

async function processPostTreeHistory(body, res) {
  const functionName = "processPostHistory";
  try{
    logger.debug(`${functionName}, "body",  ${util.inspect(body)} ${functionName}`);

    // const newHistory = makeKeyValueArrayForInsert(body);
    // console.log("newHistory", newHistory);

    const findTreeHistoryVolunteerTodayResults = await findTreeHistoryVolunteerTodayModel(body);
    logger.debug(`${JSON.parse(JSON.stringify(findTreeHistoryVolunteerTodayResults)).rowCount} findTreeHistoryVolunteerTodayResults${functionName}`);
    const rowCount = JSON.parse(JSON.stringify(findTreeHistoryVolunteerTodayResults)).rowCount;
    if (rowCount === 0) {
      logger.debug(`rowCount: ${util.inspect(findTreeHistoryVolunteerTodayResults.rowCount)} ${functionName}`);

      const insertTreeHistoryResults = await  insertTreeHistoryModel(body);
      console.log("insertTreeHistoryResults ", await insertTreeHistoryResults );
      if (!insertTreeHistoryResults) {
        responder(res, 500, {error: 'error saving'});
        return;
      }
      responder(res, 200, {data: await insertTreeHistoryResults[0]});
      return;
    } 
    const updateTreeHistoryResults = await  updateTreeHistoryModel(body);
    console.log("updateTreeHistoryResults ", await updateTreeHistoryResults );
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

function makeKeyValuesStringForUpdate() {
  const insertString = Object.entries(treehistory).reduce((prevVal,currVal,idx) => {
   if (currVal[0] !== 'id_tree' && prevVal !== null) return `${prevVal}, ${currVal[0]} = '${currVal[1]}'`;
  }, '');
  const insertStringWithoutId = insertString.replace('undefined, ', '');
  return insertStringWithoutId;
}

function makeKeyValueArrayForInsert(newTreehistory) {
  const [newKeys, newValues] = Object.entries(newTreehistory).reduce((prevVal,currVal,idx) => {
     console.log('prevVal,currVal', prevVal,currVal);
    return [...prevVal, ...currVal[0]];
  }, []);
   console.log('[newKeys, newValues]', newKeys, newValues);
}

function responder(res, code, message) {
  const functionName = "responder";
  res.statusCode = code;
  res.json(message);
}

// processGetPostNote({params: {id_tree:  5, note: "doesn't matter"}}, {});

module.exports = { getMap, getTree, postTree, getTreeHistory, postTreeHistory };
