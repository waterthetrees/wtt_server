export class IUsersRepository {
  constructor({ dataSource }) {
    this.dataSource = dataSource;
  }

  // eslint-disable-next-line no-unused-vars
  async findUser({ email }) {
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line no-unused-vars
  async createUser({ user: { nickname, name, picture, email } }) {
    throw new Error('Not implemented');
  }
}

export class UsersRepository extends IUsersRepository {
  constructor({ dataSource }) {
    super({ dataSource });
  }

  async findUser({ email }) {
    return this.dataSource.oneOrNone(
      `
      SELECT id_user, email, name, nickname
      FROM users
      WHERE email = $1
      `,
      [email],
    );
  }

  async createUser({ user: { nickname, name, picture, email } }) {
    return this.dataSource.oneOrNone(
      `
      INSERT INTO users (email, name, nickname, picture)
      VALUES ($1, $2, $3, $4)
      RETURNING id_user, email, name, nickname
      `,
      [email, name, nickname, picture],
    );
  }
}

export class FakeUsersRepository extends IUsersRepository {
  users = new Map();
  id = 102;

  constructor({ dataSource }) {
    super({ dataSource });

    this.users.set('johndoe@gmail.com', {
      email: 'johndoe@gmail.com',
      id_user: 100,
      name: 'John Doe',
      nickname: 'jdoe',
    });

    this.users.set('janeroe@gmail.com', {
      email: 'janeroe@gmail.com',
      id_user: 101,
      name: 'Jane Roe',
      nickname: 'jroe',
    });
  }

  async findUser({ email }) {
    return Promise.resolve(this.users.get(email) ?? null);
  }

  async createUser({ user: { nickname, name, picture, email } }) {
    const newUser = Promise.resolve({
      idUser: this.id,
      email,
      name,
      nickname,
    });
    this.id++;
    return newUser;
  }
}
