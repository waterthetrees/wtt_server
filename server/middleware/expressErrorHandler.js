const logger = require('../../logger');
const { pgPromise } = require('../db');

function expressErrorHandler(err, req, res, next) {
  logger.error(err.toString());

  if (err instanceof pgPromise.errors.QueryResultError) {
    res.status(404).json({ error: err.message });
  }

  res.status(err.statusCode || 500).json({ error: err.message });
  next();
}

module.exports = expressErrorHandler;
