import logger from '../../logger.js';
import AppError from '../errors/AppError.js';

export default function expressErrorHandler(err, req, res, next) {
  logger.error(err.toString());

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal Service Error.' });
}
