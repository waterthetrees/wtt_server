const treeadoptionsRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const {
  findTreeAdoptionsByTreeId,
  adoptTree,
  unadoptTree,
} = require('./treeadoptions-queries');

treeadoptionsRouter.get('/', async (req, res) => {
  const { idTree, email } = req.query;

  if (!idTree || !email) {
    throw new AppError(400, 'Missing required parameter(s): idTree or email.');
  }

  const treeAdoptions = await findTreeAdoptionsByTreeId(idTree);

  const data = {
    adopted: treeAdoptions.some((treeAdoption) => treeAdoption.email === email),
    adoptedCount: treeAdoptions.length,
  };

  res.status(200).json(data);
});

treeadoptionsRouter.post('/', async (req, res) => {
  // TODO: make POST and DELETE separate requests
  const { request, ...body } = req.body;

  if (request.type === 'DELETE') {
    const { rowCount } = await unadoptTree(body);

    if (rowCount !== 1) {
      throw new AppError(404, 'Failed to unadopt tree.');
    }

    res.status(200).json({ success: true });
  } else {
    const data = await adoptTree(body);

    res.status(200).json(data);
  }
});

module.exports = treeadoptionsRouter;
