const treeadoptionsRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const {
  findTreeAdoptionsByTreeId,
  adoptTree,
  unadoptTree,
} = require('./treeadoptions-queries');
const { validatePostTreeAdoptions } = require('./treeadoptions-validations');

treeadoptionsRouter.get('/', async (req, res) => {
  const { id, email } = req.query;

  if (!id || !email) {
    throw new AppError(400, 'Missing required parameter(s): id or email.');
  }

  const treeAdoptions = await findTreeAdoptionsByTreeId(id);

  const data = {
    adopted: treeAdoptions.some((treeAdoption) => treeAdoption.email === email),
    adoptedCount: treeAdoptions.length,
  };

  res.status(200).json(data);
});

/**
 * TODO: make POST and DELETE separate requests
 */
treeadoptionsRouter.post('/', async (req, res) => {
  const isValidated = validatePostTreeAdoptions(req);

  if (!isValidated) {
    throw new AppError(400, 'Missing required parameter(s).');
  }
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
