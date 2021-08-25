// checks whether key exists in object also value at that key is not undefined
function validation(objectIn, key, valueIn) {
  const valueOut = typeof valueIn === 'undefined' ? '' : valueIn;
  return Reflect.has(objectIn, key) ? Reflect.get(objectIn, key) : valueOut;
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
  validatePostUser,
};
