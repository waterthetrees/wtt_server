util = require("util");
logger = require("../logger.js");
const validator = require("validator");

const feature_flags = {
  live: false,
};

// checks whether key exists in object also value at that key is not undefined
function validation(objectIn, key, valueIn) {
  let valueOut = typeof valueIn === "undefined" ? "" : valueIn;
  return Reflect.has(objectIn, key) ? Reflect.get(objectIn, key) : valueOut;
}

function isString(hopeString) {
  return (typeof hopeString === 'string');
}

function iterateOverObjCheckingForString(obj) {
  const removeMe = 'idTree';
  const { [removeMe]: removedKey, ...newObjWithoutId } = obj;
  return Object.entries(newObjWithoutId).every(([key, value]) => {
   return isString(value);
  });
}

function validateGetMap(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "query", req.query) === "") return false;
  if (validation(req, "city", req.query.city) === "") return false;
  return true;
}

function validateGetTree(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "query", req.query) === "") return false;
  if (validation(req, "currentTreeId", req.query.currentTreeId) === "") return false;
  return true;
}

function validateGetTreeHistory(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "query", req.query) === "") return false;
  if (validation(req, "currentTreeId", req.query.currentTreeId) === "") return false;
  return true;
}

function validatePostTree(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "body", req.body) === "") return false;
  if (validation(req, "idTree", req.body.idTree) === "") return false;
  return iterateOverObjCheckingForString(req.body);
}

function validatePostTreeHistory(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "body", req.body) === "") return false;
  if (validation(req, "idTree", req.body.idTree) === "") return false;
  return iterateOverObjCheckingForString(req.body);
}

module.exports = { 
  validateGetMap, 
  validateGetTree, 
  validateGetTreeHistory, 
  validatePostTree,
  validatePostTreeHistory  
};
