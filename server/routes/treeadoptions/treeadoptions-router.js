const treeadoptionsRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const treeadoptionsQueries = require('./treeadoptions-queries');

treeadoptionsRouter.get('/', async (req, res) => {
  const { idTree, email } = req.query;

  if (!idTree || !email) {
    throw new AppError(400, 'Missing required parameter(s): idTree or email.');
  }

  const rows = await treeadoptionsQueries.findTreeAdoptionsById(idTree);

  const data = {
    adopted: rows.some((row) => row.email === email),
    adoptedCount: rows.length,
  };

  res.status(200).json(data);
});

treeadoptionsRouter.post('/', async (req, res) => {
  const { request, ...body } = req.body;

  if (request.type === 'DELETE') {
    const { rowCount } = await treeadoptionsQueries.unadoptTree(body);

    if (rowCount !== 1) {
      throw new AppError(404, 'Failed to find tree.');
    }

    res.status(200).json({ success: true });
  } else {
    const data = await treeadoptionsQueries.adoptTree(body);

    res.status(200).json(data);
  }
});

module.exports = treeadoptionsRouter;
