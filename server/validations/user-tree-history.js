const { validation } = require('./utils');

function validateGetUserTreeHistory(req) {
  if (validation(req, 'req', req) === '') return false;
  if (validation(req, 'query', req.query) === '') return false;
  if (validation(req, 'volunteer', req.query.volunteer) === '') return false;

  return true;
}

module.exports = {
  validateGetUserTreeHistory,
}
