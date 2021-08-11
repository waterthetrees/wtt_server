const logger = require('../../logger');

const unknownEndpoint = (req, res) =>
  res.status(404).send({ error: `Unknown endpoint: ${req.method} ${req.path}` });

const errorHandler = (err, req, res, next) => {
  logger.info(`${err.name}: ${err.message}`);

  if (err.name === 'QueryResultError') {
    res.status(404).json({ error: err.message });
  }

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
