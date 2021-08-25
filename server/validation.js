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

module.exports = {
  validateGetTodaysTrees,
};