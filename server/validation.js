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

function validateGetTreeList(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "query", req.query) === "") return false;
  if (validation(req, "coordinates", req.query.coordinates) === "") return false;
  return true;
}

function validateGetTreeHistory(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "query", req.query) === "") return false;
  if (validation(req, "currentTreeId", req.query.currentTreeId) === "") return false;
  return true;
}

function validateUpdateTree(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "body", req.body) === "") return false;
  if (validation(req, "idTree", req.body.idTree) === "") return false;
  return iterateOverObjCheckingForString(req.body);
}

function validatePostTree(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "body", req.body) === "") return false;
  if (validation(req, "common", req.body.common) === "") return false;
  if (validation(req, "scientific", req.body.scientific) === "") return false;
  if (validation(req, "lat", req.body.lat) === "") return false;
  if (validation(req, "lng", req.body.lng) === "") return false;
  if (validation(req, "datePlanted", req.body.datePlanted) === "") return false;
  return true;
}

function validatePostTreeHistory(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "body", req.body) === "") return false;
  if (validation(req, "idTree", req.body.idTree) === "") return false;
  return iterateOverObjCheckingForString(req.body);
}

function validatePostUser(req) {
  if (validation(req, "req", req) === "") return false;
  if (validation(req, "body", req.body) === "") return false;
  if (validation(req, "name", req.body.name) === "") return false;
  if (validation(req, "email", req.body.email) === "") return false;
  if (validation(req, "nickname", req.body.nickname) === "") return false;
  return true;
}

module.exports = {
  validateGetMap,
  validateGetTree,
  validateGetTreeHistory,
  validatePostTree,
  validateUpdateTree,
  validatePostTreeHistory,
  validateGetTreeList,
  validatePostUser,
};
