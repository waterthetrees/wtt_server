import { buildUserController } from '../user-controller.js';
import { buildUserService } from '../user-service.js';

export const fakeUserRepository = buildFakeUserRepository();
export const fakeUserService = buildUserService(fakeUserRepository);
export const fakeUserController = buildUserController(fakeUserService);

function buildFakeUserRepository() {
  let id = 100;
  const users = new Map();

  users.set('johndoe@gmail.com', {
    email: 'johndoe@gmail.com',
    id_user: id,
    name: 'John Doe',
    nickname: 'jdoe',
  });

  id++;

  users.set('janeroe@gmail.com', {
    email: 'janeroe@gmail.com',
    id_user: id,
    name: 'Jane Roe',
    nickname: 'jroe',
  });

  id++;

  const createUser = async (email, name, nickname) => {
    console.log(
      `In fakeUserRepository: createUser on env ${process.env.TEST && 'TEST'}`,
    );

    const newUser = Promise.resolve({
      idUser: id,
      email,
      name,
      nickname,
    });
    id++;
    return newUser;
  };

  const getUser = async (email) => {
    return Promise.resolve(users.get(email) ?? null);
  };

  return {
    createUser,
    getUser,
  };
}
