const {
  getMapSubsetModel,
  getMapByCityModel,
  getTreeModel,
  getGeoJson,
  getTreeHistoryModel,
  postNoteModel,
} = require("./models/models_treeme.js");
const { validateGetMapRequest } = require("./validation.js");
const { logger } = require("./../logger.js");
util = require("util");
const has = Object.prototype.hasOwnProperty;

function getMap(req, res) {
  const functionName = "getMap";
  logger.debug(
    `req  ${util.inspect(req.query, false, 10, true)} ${functionName}`
  );

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
    let treeMapResults = await getGeoJson({ city: "Oakland" });
    // let treeResults = (query.requestType === 'GetMapSubset') ? await getMapSubsetModel(await query) : await getMapByCityModel(await query);
    // console.log('\n\n\n\ntreeResults', await treeResults, 'treeResults\n\n\n\n');
    // TODO figure out a sort so south trees will be above north trees
    // treeResults = await results.sort((a, b) => a.latitude < b.latitude);
    if (
      (await treeMapResults) &&
      has.call(treeMapResults, "rows") &&
      treeMapResults.rows.length > 0
    ) {
      // console.debug(`${functionName} results.rows[0].jsonb_build_object ${util.inspect(results.rows[0].jsonb_build_object, false, 10, true)}`);
      const treeMapResultsObject = treeMapResults.rows[0].jsonb_build_object;
      res.statusCode = 200;
      // res.send({data: await treeResults});
      res.json(await treeMapResultsObject);
    }

    return;
  } catch (err) {
    logger.error(
      `${functionName} CATCH ERROR  ${util.inspect(err, false, 10, true)}`
    );
    res.statusCode = 500;
    res.json({ error: err });
    return;
  }
}

function getTree(req, res) {
  const functionName = "getTree";
  logger.debug(
    `req  ${util.inspect(
      req.query,
      false,
      10,
      true
    )} ${functionName} ASDFASDFASDFASDF`
  );

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
    let treeHistoryResults = await getTreeHistoryModel(currentTreeId);
    // TODO figure out a sort so south trees will be above north trees
    // treeResults = await results.sort((a, b) => a.latitude < b.latitude);
    res.statusCode = 200;
    // res.send(await treeResults);
    res.json(await treeResults);
    return;
  } catch (err) {
    logger.error(
      `${functionName} CATCH ERROR  ${util.inspect(err, false, 10, true)}`
    );
    res.statusCode = 500;
    res.json({ error: err });
    return;
  }
}

function getHistory(req, res) {
  const functionName = "getTree";
  logger.debug(
    `req  ${util.inspect(
      req.query,
      false,
      10,
      true
    )} ${functionName} ASDFASDFASDFASDF`
  );
  processGetgetHistory(req.query, res);
  return;
}

async function processGetgetHistory(query, res) {
  const functionName = "processGetTree";
  try {
    const { currentTreeId } = query;
    console.log("query", query, "currentTreeId", currentTreeId);
    let treeHistoryResults = await getTreeHistoryModel(currentTreeId);
    // TODO figure out a sort so south trees will be above north trees
    // treeResults = await results.sort((a, b) => a.latitude < b.latitude);
    res.statusCode = 200;
    // res.send(await treeResults);
    res.json(await treeHistoryResults);
    return;
  } catch (err) {
    logger.error(
      `${functionName} CATCH ERROR  ${util.inspect(err, false, 10, true)}`
    );
    res.statusCode = 500;
    res.json({ error: err });
    return;
  }
}

function postNote(req, res) {
  const functionName = "postNote";
  logger.debug(`req  ${util.inspect(req, false, 10, true)} ${functionName}`);

  // const validated = validateGetMapRequest(req);
  // if (!validated) {
  //   res.statusCode = 400;
  //   res.json({'error': 'not valid'});
  //   return;
  // }

  processPostNote(req, res);
  return;
}

function processGetPostNote(req, res) {
  const functionName = "processGetPostNote";
  try {
    const { id_tree, note } = req.params;
    const postNoteResults = postNoteModel(id_tree, note);
    // res.statusCode = 200;

    // res.json(postNoteResults); // Sends the response
    // console.debug("res", res);
    console.log("postNoteResults", postNoteResults);
    return;
  } catch (err) {
    logger.error(
      `${functionName} CATCH ERROR  ${util.inspect(err, false, 10, true)}`
    );
    res.statusCode = 500;
    res.json({ error: err });
    return;
  }
}

// processGetPostNote({params: {id_tree:  5, note: "doesn't matter"}}, {});

module.exports = { getMap, getTree, getHistory, postNote };
