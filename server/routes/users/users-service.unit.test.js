import { FakeUsersRepository } from './users-queries.js';
import { buildUsersService } from './users-service.js';

describe('Users Service', () => {
  let usersService;

  beforeEach(() => {
    const fakeUsersRepository = new FakeUsersRepository({ dataSource: null });
    usersService = buildUsersService({ usersRepository: fakeUsersRepository });
  });

  describe('getUser', () => {
    it('Returns the user if found', async () => {
      /** Given */
      const userDTO = { email: 'johndoe@gmail.com' };

      /** When */
      const user = await usersService.getUser({ userDTO });

      /** Then */
      expect(user).toEqual({
        id_user: 100,
        email: userDTO.email,
        name: 'John Doe',
        nickname: 'jdoe',
      });
    });

    it('Returns null if no user is found', async () => {
      /** Given */
      const userDTO = { email: 'baduser@gmail.com' };

      /** When */
      const user = await usersService.getUser({ userDTO });

      /** Then */
      expect(user).toBeNull();
    });
  });

  describe('createUser', () => {
    it('Returns the created user', async () => {
      /** Given */
      const userDTO = {
        email: 'newuser@gmail.com',
        name: 'John Doe',
        nickname: 'jdoe',
      };

      /** When */
      const user = await usersService.createUser({ userDTO });

      /** Then */
      expect(user).toEqual({
        idUser: 102,
        email: userDTO.email,
        name: userDTO.name,
        nickname: userDTO.nickname,
      });
    });
  });
});
