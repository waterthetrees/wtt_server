import express from 'express';
import AppError from '../../errors/AppError.js';
import {
  createUser,
  findUserByEmail,
  addBadgeToUser,
  getUserAndBadges,
} from './users-queries.js';
import validatePostUser from './users-validations.js';

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    throw new AppError(400, 'Missing required parameter: email.');
  }

  const user = await findUserByEmail(email);

  if (user) {
    res.status(200).json(user);
  } else {
    throw new AppError(404, 'Failed to find user.');
  }
});

userRouter.post('/', async (req, res) => {
  const validated = validatePostUser(req);

  if (!validated) {
    throw new AppError(400, 'Missing required parameter(s).');
  }

  const user = await findUserByEmail(req.body.email);

  if (user) {
    await processUserBadges(user);
    res.status(200).json(user);
  } else {
    const newUser = await createUser(req.body);
    res.status(201).json(newUser);
  }
});

// Get the badge IDs
const BADGE_IDS = {
  watering_level_1: 1,
  watering_level_2: 2,
};

// Function to check if user already has the badge
function hasBadge(user, badgeName) {
  return user.badge_name && user.badge_name.includes(badgeName);
}

// Function to process user badges
async function processUserBadges(user) {
  if (user.watering_count > 5 && !hasBadge(user, 'Watering Level 1')) {
    await addBadgeToUser(user.id_user, BADGE_IDS.watering_level_1);
  }

  if (user.watering_count > 10 && !hasBadge(user, 'Watering Level 2')) {
    await addBadgeToUser(user.id_user, BADGE_IDS.watering_level_2);
  }
}

export default userRouter;
