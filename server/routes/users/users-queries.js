import { db, pgPromise } from '../../db/index.js';

const usersTable = new pgPromise.helpers.ColumnSet(
  ['nickname', 'name', 'picture', 'email'],
  { table: 'users' },
);

export async function createUser(newUserData) {
  const query = pgPromise.helpers.insert(newUserData, usersTable);
  const returningClause = 'RETURNING name, nickname, email, id_user';
  const newUser = await db.oneOrNone(query + returningClause, newUserData);

  return newUser;
}

export async function findUserByEmail(email) {
  const query = `
    SELECT id_user, email, name, nickname
    FROM users
    WHERE email = $1
  `;
  const values = [email];
  const user = await db.oneOrNone(query, values);

  return user;
}

// Function to add badge to the user
export async function addBadgeToUser(userId, badgeId) {
  try {
    await db.none('INSERT INTO user_badges(id_user, id_badge) VALUES($1, $2)', [
      userId,
      badgeId,
    ]);
    console.log('Badge added successfully');
  } catch (error) {
    console.error('Error adding badge:', error);
  }
}

// Function to get a user and their badges
export async function getUserAndBadges(nickname) {
  try {
    const user = await db.any(
      `
          SELECT users.nickname, badges.badge_name
          FROM users
          LEFT JOIN user_badges ON users.id_user = user_badges.id_user
          LEFT JOIN badges ON user_badges.id_badge = badges.id_badges
          WHERE users.nickname = $1
      `,
      [nickname],
    );

    console.log(user);
    return user;
  } catch (error) {
    console.error('Error getting user and badges:', error);
  }
}
