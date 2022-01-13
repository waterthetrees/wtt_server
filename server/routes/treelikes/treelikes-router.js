const treelikesRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const {
  findTreeLikesByTreeId,
  likeTree,
  unlikeTree,
} = require('./treelikes-queries');
const { validatePostTreeLikes } = require('./treelikes-validations');

treelikesRouter.get('/', async (req, res) => {
  const { id, email } = req.query;

  if (!id || !email) {
    throw new AppError(400, 'Missing required parameter(s): id or email.');
  }

  const treeLikes = await findTreeLikesByTreeId(id);

  const data = {
    liked: treeLikes.some((treeLike) => treeLike.email === email),
    likedCount: treeLikes.length,
  };

  res.status(200).json(data);
});

/**
 * TODO: make POST and DELETE separate requests
 */
treelikesRouter.post('/', async (req, res) => {
  const isValidated = validatePostTreeLikes(req);

  if (!isValidated) {
    throw new AppError(400, 'Missing required parameter(s).');
  }

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
