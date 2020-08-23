const { getMapSubsetModel, getMapByCityModel, getTreeModel, getGeoJson } = require('./models/models_treeme.js');
const { validateGetMapRequest } = require('./validation.js')
const {logger} = require('./../logger.js');
util = require('util');


function getMap(req, res) {
  const functionName = 'getMap';
  logger.debug(`req  ${util.inspect(req.query, false, 10, true)} ${functionName}`);

  const validated = validateGetMapRequest(req);
  if (!validated) {
    res.statusCode = 400;
    res.json({'error': 'not valid'});
    return;
  } 

  processGetMap(req.query, res);
  return;
}

async function processGetMap(query, res) {
  const functionName = 'processGetMap';
  try {
    let treeResults = await getGeoJson({city: 'Oakland'});
    // let treeResults = (query.requestType === 'GetMapSubset') ? await getMapSubsetModel(await query) : await getMapByCityModel(await query);
    console.log('\n\n\n\ntreeResults', await treeResults, 'treeResults\n\n\n\n');
    // TODO figure out a sort so south trees will be above north trees
    // treeResults = await results.sort((a, b) => a.latitude < b.latitude); 


    res.statusCode = 200;
    res.send({data: await treeResults});
    // res.json(await treeResults);
    return;
  } catch(err) {
    logger.error(`${functionName} CATCH ERROR  ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({'error': err});
    return;
  } 
}

function getTree(req, res) {
  const functionName = 'getTree';
  logger.debug(`req  ${util.inspect(req.query, false, 10, true)} ${functionName}`);

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
  const functionName = 'processGetTree';
  try {
    const {lat, lng } = query;
    console.log('query',query, 'lat', lat, 'lng', lng)
    let treeResults = await getTreeModel(lat, lng);
    // TODO figure out a sort so south trees will be above north trees
    // treeResults = await results.sort((a, b) => a.latitude < b.latitude); 
    res.statusCode = 200;
    res.send(await treeResults);
    return;
  } catch(err) {
    logger.error(`${functionName} CATCH ERROR  ${util.inspect(err, false, 10, true)}`);
    res.statusCode = 500;
    res.json({'error': err});
    return;
  } 
}

module.exports = { getMap, getTree };