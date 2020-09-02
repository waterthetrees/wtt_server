const {
  getMapSubsetModel,
  getMapByCityModel,
  getTreeModel,
  getGeoJson,
  postTreeNoteModel,
  getTreeHistoryModel,
  findTreeHistoryVolunteerTodayModel,
} = require("./models/models_treeme.js");

const {
  insertTreeHistoryModel,
  updateTreeHistoryModel,
} = require("./models/models_wtt.js");

const { validateGetMapRequest } = require("./validation.js");
const { logger } = require("./../logger.js");
util = require("util");
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
  const functionName = "processGetMap";
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
    // console.log("query", query, "currentTreeId", currentTreeId);
    let treeResults = await getTreeModel(currentTreeId);
    let treeHistoryResults = await getTreeHistoryModel(currentTreeId);
    // TODO figure out a sort so south trees will be above north trees
    // treeResults = await results.sort((a, b) => a.latitude < b.latitude);
    res.statusCode = 200;
    // res.send(await treeResults);
    res.json(await treeResults);
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
    // console.log("query", query, "currentTreeId", currentTreeId);
    let treeHistoryResults = await getTreeHistoryModel(currentTreeId);
    // TODO figure out a sort so south trees will be above north trees
    // treeResults = await results.sort((a, b) => a.latitude < b.latitude);
    res.statusCode = 200;
    // res.send(await treeResults);
    res.json(await treeHistoryResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
    return;
  }
}

function postTreeNote(req, res) {
  const functionName = "postTreeNote";
  logger.debug(`req  ${util.inspect(req, false, 10, true)} ${functionName}`);

  // const validated = validateGetMapRequest(req);
  // if (!validated) {
  //   res.statusCode = 400;
  //   res.json({'error': 'not valid'});
  //   return;
  // }

  processPostTreeNote(req, res);
  return;
}

function processPostTreeNote(req, res) {
  const functionName = "processPostTreeNote";
  try {
    const { id_tree, note } = req.params;
    const postNoteResults = postTreeNoteModel(id_tree, note);
    // res.statusCode = 200;

    // res.json(postNoteResults); // Sends the response
    // console.debug("res", res);
    console.log("postNoteResults", postNoteResults);
    return;
  } catch (err) {
    logger.error(`CATCH ${functionName} ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({ error: err });
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
      console.log("insertTreeHistoryResults ", await insertTreeHistoryResults )
      responder(res, 200, await insertTreeHistoryResults.rows);
      return;
    } 
    const updateTreeHistoryResults = await  updateTreeHistoryModel(body);
    console.log("updateTreeHistoryResults ", await updateTreeHistoryResults );
    responder(res, 200, await updateTreeHistoryResults.rows);
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
  // const keys = Object.keys(newTreehistory);
  // const values = Object.values(newTreehistory);
  // console.log('keys, values', keys, values);
  // return [keys, values];

  const [newKeys, newValues] = Object.entries(newTreehistory).reduce((prevVal,currVal,idx) => {
     console.log('prevVal,currVal', prevVal,currVal);
    return [...prevVal, ...currVal[0]];

    // return `${prevVal}, ${currVal[0]} = '${currVal[1]}'`;
  
  }, []);
   console.log('[newKeys, newValues]', newKeys, newValues);

  // const insertStringWithoutId = insertString.replace('undefined, ', '');
}

function responder(res, code, message) {
  const functionName = "responder";
  res.statusCode = code;
  res.json(message);
}

// processGetPostNote({params: {id_tree:  5, note: "doesn't matter"}}, {});

module.exports = { getMap, getTree, getTreeHistory, postTreeNote, postTreeHistory };
