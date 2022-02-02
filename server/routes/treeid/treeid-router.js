import express from 'express';
import AppError from '../../errors/AppError.js';

import validateGetTreeId from './treeid-validations.js';
import { createIdForTree } from './id.js';

const treeidRouter = express.Router();

treeidRouter.get('/', async (req, res) => {
  if (!validateGetTreeId(req)) {
    throw new AppError(400, 'Missing required parameter');
  }

  const id = await createIdForTree(req.body);
  res.status(200).json(id);
});

export default treeidRouter;
