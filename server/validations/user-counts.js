const { validation } = require('./utils');

function validateGetUserCounts(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'request', req.query.request) === '') return false;
  if (validation(req, 'email', req.query.email) === '') return false;

  return true;
}

module.exports = {
  validateGetUserCounts,
}
