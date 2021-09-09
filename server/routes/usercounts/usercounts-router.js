const usercountsRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const {
  findUserAdoptedTrees,
  findUserLikedTrees,
  findUserPlantedTrees,
} = require('./usercounts-queries');

usercountsRouter.get('/', async (req, res) => {
  const { email, request } = req.query;

  if (!email || !request) {
    throw new AppError(400, 'Missing required parameter(s): email or request.');
  }

  let userCounts = null;

  switch (request) {
    case 'adopted':
      userCounts = await findUserAdoptedTrees(email);
      break;
    case 'liked':
      userCounts = await findUserLikedTrees(email);
      break;
    case 'planted':
      userCounts = await findUserPlantedTrees(email);
      break;
    default:
      break;
  }

  res.status(200).json(userCounts);
});

module.exports = usercountsRouter;
