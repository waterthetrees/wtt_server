const treelikesRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const {
  findTreeLikesByTreeId,
  likeTree,
  unlikeTree,
} = require('./treelikes-queries');

treelikesRouter.get('/', async (req, res) => {
  const { idTree, email } = req.query;

  if (!idTree || !email) {
    throw new AppError(400, 'Missing required parameter(s): idTree or email.');
  }

  const treeLikes = await findTreeLikesByTreeId(idTree);

  const data = {
    liked: treeLikes.some((treeLike) => treeLike.email === email),
    likedCount: treeLikes.length,
  };

  res.status(200).json(data);
});

treelikesRouter.post('/', async (req, res) => {
  // TODO: make POST and DELETE separate requests
  const { request, ...body } = req.body;

  if (request.type === 'DELETE') {
    const { rowCount } = await unlikeTree(body);

    if (rowCount !== 1) {
      throw new AppError(404, 'Failed to unlike tree.');
    }

    res.status(200).json({ success: true });
  } else {
    const data = await likeTree(body);

    res.status(200).json(data);
  }
});

module.exports = treelikesRouter;
