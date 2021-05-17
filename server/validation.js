// const { inspect } = require('util');
// const validator = require('validator');
// const {
// info, verbose, debu, error,
// } = require('../logger.js');

// const featureFlags = {
//   live: false,
// };

// checks whether key exists in object also value at that key is not undefined
function validation(objectIn, key, valueIn) {
  const valueOut = typeof valueIn === 'undefined' ? '' : valueIn;
  return Reflect.has(objectIn, key) ? Reflect.get(objectIn, key) : valueOut;
}

function isString(hopeString) {
  return (typeof hopeString === 'string');
}

function iterateOverObjCheckingForString(obj) {
  const removeMe = 'idTree';
  const { [removeMe]: removedKey, ...newObjWithoutId } = obj;
  // eslint-disable-next-line no-unused-vars
  return Object.entries(newObjWithoutId).every(([key, value]) => isString(value));
}
function validateGetTodaysTrees(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'city', req.query.city) === '') return false;
  return true;
}

function validateGetCities(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'city', req.query.city) === '') return false;
  return true;
}

function validateGetTree(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'currentTreeId', req.query.currentTreeId) === '') return false;
  return true;
}

function validateGetTreeList(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'coordinates', req.query.coordinates) === '') return false;
  return true;
}

function validateGetTreeHistory(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'currentTreeId', req.query.currentTreeId) === '') return false;
  return true;
}

function validateUpdateTree(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'body', req.body) === '') return false;
  if (validation(req, 'idTree', req.body.idTree) === '') return false;
  return iterateOverObjCheckingForString(req.body);
}

function validatePostTree(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'body', req.body) === '') return false;
  if (validation(req, 'common', req.body.common) === '') return false;
  // if (validation(req, "scientific", req.body.scientific) === "") return false;
  if (validation(req, 'lat', req.body.lat) === '') return false;
  if (validation(req, 'lng', req.body.lng) === '') return false;
  if (validation(req, 'datePlanted', req.body.datePlanted) === '') return false;
  return true;
}

function validatePostTreeHistory(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'body', req.body) === '') return false;
  if (validation(req, 'idTree', req.body.idTree) === '') return false;
  return true;
  // return iterateOverObjCheckingForString(req.body);
}

function validatePostUser(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'body', req.body) === '') return false;
  if (validation(req, 'name', req.body.name) === '') return false;
  if (validation(req, 'email', req.body.email) === '') return false;
  if (validation(req, 'nickname', req.body.nickname) === '') return false;
  return true;
}

function validateAddNewCity(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'body', req.body) === '') return false;
  if (validation(req, 'city', req.body.city) === '') return false;
  return true;
}

// used for tree adoption and tree favorites
function validatePostTreeUser(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'body', req.body) === '') return false;
  if (validation(req, 'idTree', req.body.idTree) === '') return false;
  if (validation(req, 'common', req.body.common) === '') return false;
  if (validation(req, 'email', req.body.email) === '') return false;
  if (validation(req, 'nickname', req.body.nickname) === '') return false;
  return true;
}

function validateGetTreeUser(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'idTree', req.query.idTree) === '') return false;
  if (validation(req, 'email', req.query.email) === '') return false;
  return true;
}

function validateCountUserTree(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'request', req.query.request) === '') return false;
  if (validation(req, 'email', req.query.email) === '') return false;
  return true;
}

function validateGetUserTreehistory(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'request', req.query.request) === '') return false;
  if (validation(req, 'volunteer', req.query.volunteer) === '') return false;
  return true;
}

module.exports = {
  validateGetCities,
  validateGetTree,
  validateGetTreeHistory,
  validatePostTree,
  validateUpdateTree,
  validatePostTreeHistory,
  validateGetTreeList,
  validatePostUser,
  validateAddNewCity,
  validatePostTreeUser,
  validateGetTreeUser,
  validateGetTodaysTrees,
  validateCountUserTree,
  validateGetUserTreehistory,
};
