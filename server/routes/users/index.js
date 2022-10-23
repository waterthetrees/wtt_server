import express from 'express';
import userController from './user-controller.js';
// import { fakeUserController } from './__test__/fixtures.js';

// export const usersRoute = process.env.TEST
//   ? express
//       .Router()
//       .post('/', fakeUserController.post)
//       .get('/', fakeUserController.get)
//   : express
//       .Router()
//       .post('/', userController.post)
//       .get('/', userController.get);

export const usersRoute = express.Router();
usersRoute.post('/', userController.post);
usersRoute.get('/', userController.get);
