util = require('util');
logger = require('../logger.js');
const validator = require('validator');

const feature_flags = {
  live: false,
}

// checks whether key exists in object also value at that key is not undefined
function validation(objectIn, key, valueIn) {
  let valueOut = (typeof valueIn === 'undefined' ? '' : valueIn);
  return (Reflect.has(objectIn, key)) ? Reflect.get(objectIn, key) : valueOut;
}

function validateGetMapRequest(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;

  // how is query coming in?
  if (validation(req, 'requestType', req.query.requestType) === '') return false;
  return true;
}

module.exports = { validateGetMapRequest }