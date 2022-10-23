import { db } from '../../db/index.js';

export const createUser = (db) => async (email, name, nickname, picture) => {
  return db.oneOrNone(
    `
      INSERT INTO users (email, name, nickname, picture)
      VALUES ($1, $2, $3, $4)
      RETURNING id_user, email, name, nickname
      `,
    [email, name, nickname, picture],
  );
};

export const getUser = (db) => async (email) => {
  return db.oneOrNone(
    `
      SELECT id_user, email, name, nickname
      FROM users
      WHERE email = $1
      `,
    [email],
  );
};

export const buildUserQueries = (db) => ({
  createUser: createUser(db),
  getUser: getUser(db),
});

export default buildUserQueries(db);
// export default buildUserQueries(import('../../../db/index.js'));
