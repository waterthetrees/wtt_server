import express from 'express';
import { db } from '../../db/index.js';
import { buildExpressCallback } from '../../infrastructure/build-express-callback.js';
import { buildUsersController } from './users-controller.js';
import { UsersRepository } from './users-queries.js';
import { buildUsersService } from './users-service.js';

const usersRepository = new UsersRepository({ dataSource: db });
const usersService = buildUsersService({ usersRepository });
const usersController = buildUsersController({ usersService });

const usersRouter = express.Router();
usersRouter.get('/', buildExpressCallback(usersController.getRequestHandler));
usersRouter.post('/', buildExpressCallback(usersController.postRequestHandler));

export default usersRouter;
