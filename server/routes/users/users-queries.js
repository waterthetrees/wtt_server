const { db } = require('../../db');

function findUserByEmail(email) {
  const query = `
    SELECT id_user, email, name, nickname
    FROM users
    WHERE email = $1
  `;
  const values = [email];

  return db.oneOrNone(query, values);
}

async function addUser(newUser) {
  console.log(JSON.stringify(newUser));

  const query = `
    INSERT INTO users(\${this:name})
    VALUES(\${this:csv})
    RETURNING name, nickname, email, id_user
  `;

  return db.oneOrNone(query, newUser);
}

module.exports = {
  findUserByEmail,
  addUser,
};
