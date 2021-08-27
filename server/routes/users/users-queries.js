const { db } = require('../../db');

async function createUser(newUserData) {
  const query = `
    INSERT INTO users(\${this:name})
    VALUES(\${this:csv})
    RETURNING name, nickname, email, id_user
  `;
  const newUser = db.oneOrNone(query, newUserData);

  return newUser;
}

function findUserByEmail(email) {
  const query = `
    SELECT id_user, email, name, nickname
    FROM users
    WHERE email = $1
  `;
  const values = [email];
  const user = db.oneOrNone(query, values);

  return user;
}

module.exports = {
  createUser,
  findUserByEmail,
};
