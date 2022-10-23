import supertest from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { startServer } from '../../app.js';
import userController from './user-controller.js';
import { fakeUserController } from './__test__/fixtures.js';

describe('GET /api/users', () => {
  let app = startServer();

  beforeEach(() => {
    // set up app
    // app = startServer();
  });

  afterEach(() => {
    vi.resetAllMocks();
    // tear down app
  });

  // it('A', async () => {
  //   vi.spyOn(userService, 'createUser').mockImplementation(
  //     fakeUserService.createUser,
  //   );

  //   const body = {
  //     nickname: 'nickname',
  //     name: 'my name',
  //     picture: 'picture',
  //     email: 'nickname@email.com',
  //   };

  //   await supertest(app).post('/api/users').send(body).expect({
  //     idUser: 102,
  //     email: 'nickname@email.com',
  //     name: 'my name',
  //     nickname: 'nickname',
  //   });
  // });

  // it('B', async () => {
  //   vi.spyOn(userService, 'createUser').mockImplementation(
  //     fakeUserService.createUser,
  //   );

  //   const body = {
  //     nickname: 'nickname',
  //     name: 'my name',
  //     picture: 'picture',
  //     email: 'nickname@email.com',
  //   };

  //   await supertest(app).post('/api/users').send(body).expect({
  //     idUser: 102,
  //     email: 'nickname@email.com',
  //     name: 'my name',
  //     nickname: 'nickname',
  //   });

  //   await supertest(app).post('/api/users').send(body).expect({
  //     idUser: 103,
  //     email: 'nickname@email.com',
  //     name: 'my name',
  //     nickname: 'nickname',
  //   });
  // });

  // it('C', async () => {
  //   vi.spyOn(userController, 'post').mockImplementation(
  //     fakeUserController.post,
  //   );

  //   const body = {
  //     nickname: 'nickname',
  //     name: 'my name',
  //     picture: 'picture',
  //     email: 'nickname@email.com',
  //   };

  //   await supertest(app).post('/api/users').send(body).expect({
  //     idUser: 102,
  //     email: 'nickname@email.com',
  //     name: 'my name',
  //     nickname: 'nickname',
  //   });
  // });

  it('responds with json', async () => {
    vi.spyOn(userController, 'post').mockImplementation(
      fakeUserController.post,
    );

    const body = {
      nickname: 'nickname',
      name: 'my name',
      picture: 'picture',
      email: 'nickname@email.com',
    };

    await supertest(app).post('/api/users').send(body);

    expect(userController.post).toHaveBeenCalledTimes(1);
  });
});
