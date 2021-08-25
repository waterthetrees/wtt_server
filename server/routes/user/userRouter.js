const userRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const userQueries = require('./userQueries');
const { validatePostUser } = require('./userValidations');

userRouter.get('/', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    throw new AppError(400, 'Missing required parameter: email.');
  }

  const user = await userQueries.findUserByEmail(email);

  if (user) {
    res.status(200).json(user);
  }

  throw new AppError(404, 'Failed to find user.');
});

userRouter.post('/', async (req, res) => {
  const validated = validatePostUser(req);

  if (!validated) {
    throw new AppError(400, 'Missing required parameter(s).');
  }

  const user = await userQueries.findUserByEmail(req.body.email);

  if (user) {
    res.status(200).json(user);
  }

  const newUser = await userQueries.addUser(req.body);

  res.status(201).json(newUser);
});

module.exports = userRouter;
