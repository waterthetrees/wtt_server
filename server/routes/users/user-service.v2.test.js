import { describe, expect, it } from 'vitest';
import { fakeUserService as userService } from './__test__/fixtures.js';

describe('Users Service', () => {
  describe('Create user', () => {
    it('Returns the created user', async () => {
      /** Given */
      const email = 'newuser@gmail.com';
      const name = 'John Doe';
      const nickname = 'jdoe';

      /** When */
      const user = await userService.createUser(email, name, nickname);

      /** Then */
      expect(user).toEqual({
        idUser: 102,
        email,
        name,
        nickname,
      });
    });
  });

  describe('Get user', () => {
    it('Returns the user if found', async () => {
      /** Given */
      const email = 'johndoe@gmail.com';

      /** When */
      const user = await userService.getUser(email);

      /** Then */
      expect(user).toEqual({
        email,
        id_user: 100,
        name: 'John Doe',
        nickname: 'jdoe',
      });
    });

    it('Returns null if no user is found', async () => {
      /** Given */
      const email = 'baduser@gmail.com';

      /** When */
      const user = await userService.getUser(email);

      /** Then */
      expect(user).toBeNull();
    });
  });
});
