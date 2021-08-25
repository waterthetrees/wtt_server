const logger = require('../../logger');
const { pgPromise } = require('../db');

function unknownEndpoint(req, res) {
  res
    .status(404)
    .send({ error: `Unknown endpoint: ${req.method} ${req.path}` });
}

function errorHandler(err, req, res, next) {
  logger.error(err.toString());

  if (err instanceof pgPromise.errors.QueryResultError) {
    res.status(404).json({ error: err.message });
  }

  res.status(err.statusCode || 500).json({ error: err.message });
  next();
}

module.exports = {
  unknownEndpoint,
  errorHandler,
};
