import { describe, expect, it } from 'vitest';
import AppError from '../../errors/AppError.js';
import { fakeUserController as userController } from './__test__/fixtures.js';

describe.skip('User Controller', () => {
  describe('get', () => {
    it('Returns the user if found', async () => {
      /** Given */
      const httpRequest = {
        query: {
          email: 'johndoe@gmail.com',
        },
      };

      /** When */
      const httpResponse = await userController.getRequestHandler(httpRequest);

      /** Then */
      expect(httpResponse).toEqual({
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        json: {
          nickname: 'jdoe',
          name: 'John Doe',
          email: httpRequest.query.email,
          id_user: 100,
        },
      });
    });

    it('Throws 404 error if user is not found', async () => {
      /** Given */
      const httpRequest = {
        query: {
          email: 'nobody@gmail.com',
        },
      };

      /** When */
      // const httpResponse = await userController.getRequestHandler(httpRequest);

      /** Then */
      // expect(httpResponse).toEqual({
      //   status: 404,
      //   json: {
      //     error: 'Failed to find user.',
      //   },
      // });
      // expect(async () =>
      //   userController.getRequestHandler(httpRequest),
      // ).toThrow({});

      async function get() {
        return userController.getRequestHandler(httpRequest);
      }

      // await expect(get).rejects.toThrow(
      //   expect.objectContaining({
      //     statusCode: 200,
      //     message: 'Failed to find user.',
      //   }),
      // );

      await expect(get).rejects.toThrow(
        new AppError(200, 'Failed to find user.'),
      );
    });
  });

  describe('post', () => {
    it('Returns the existing user if found', async () => {
      /** Given */
      const httpRequest = {
        body: {
          nickname: 'jdoe',
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          picture: '',
        },
      };

      /** When */
      const httpResponse = await userController.postRequestHandler(httpRequest);

      /** Then */
      expect(httpResponse).toEqual({
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
        json: {
          nickname: 'jdoe',
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          id_user: 100,
        },
      });
    });

    it("Creates a new user if the user doesn't already exist", async () => {
      /** Given */
      const httpRequest = {
        body: {
          email: 'cdiego@gmail.com',
          name: 'Carmen San Diego',
          nickname: 'cdiego',
        },
      };

      /** When */
      const httpResponse = await userController.postRequestHandler(httpRequest);

      /** Then */
      expect(httpResponse).toEqual({
        headers: {
          'Content-Type': 'application/json',
        },
        status: 201,
        json: {
          email: 'cdiego@gmail.com',
          name: 'Carmen San Diego',
          nickname: 'cdiego',
          idUser: 102,
        },
      });
    });
  });
});
