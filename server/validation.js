// checks whether key exists in object also value at that key is not undefined
function validation(objectIn, key, valueIn) {
  const valueOut = typeof valueIn === 'undefined' ? '' : valueIn;
  return Reflect.has(objectIn, key) ? Reflect.get(objectIn, key) : valueOut;
}

function validateGetTodaysTrees(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'city', req.query.city) === '') return false;
  return true;
}

function validateGetTreeList(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'coordinates', req.query.coordinates) === '')
    return false;
  return true;
}

function validatePostUser(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'body', req.body) === '') return false;
  if (validation(req, 'name', req.body.name) === '') return false;
  if (validation(req, 'email', req.body.email) === '') return false;
  if (validation(req, 'nickname', req.body.nickname) === '') return false;
  return true;
}

module.exports = {
  validateGetTreeList,
  validatePostUser,
  validateGetTodaysTrees,
};
