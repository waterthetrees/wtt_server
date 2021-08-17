const treeuserRouter = require('express').Router();
const sharedRoutesUtils = require('../sharedRoutesUtils');
const treeuserQueries = require('./treeuserQueries');

treeuserRouter.get('/', async (req, res) => {
  const { idTree, email, request } = req.query;

  if (!idTree || !email || !request) {
    res.status(400).json({ error: 'Missing required parameter(s)' });
  }

  const findTreeUserModelCallback =
    request === 'adopted'
      ? treeuserQueries.findTreeAdoptionModel
      : treeuserQueries.findTreeLikesModel;

  const rows = await findTreeUserModelCallback(idTree);

  if (!rows) {
    res.status(404).json({
      error: 'Failed to find tree',
    });
  }

  const data = {
    [request]: rows.some((row) => row.email === email),
    [`${request}Count`]: rows.length,
  };

  res.status(200).json(data);
});

treeuserRouter.post('/', async (req, res) => {
  function getProcessPostTreeUserCallback(request) {
    if (request.name === 'adopted') {
      return request.type === 'POST'
        ? treeuserQueries.insertTreeAdoptionModel
        : treeuserQueries.deleteTreeAdoptionModel;
    }

    return request.type === 'POST'
      ? treeuserQueries.insertTreeLikesModel
      : treeuserQueries.deleteTreeLikesModel;
  }

  const { request, ...body } = req.body;
  const processPostTreeUserCallback = getProcessPostTreeUserCallback(request);

  if (request.type === 'DELETE') {
    const { rowCount } = await processPostTreeUserCallback(body);

    if (rowCount !== 1) res.status(404).json({ error: 'Failed to find tree' });

    res.status(200).json({ success: true });
  } else {
    const formattedBody = sharedRoutesUtils.convertObjectToSnakeCase(body);
    const data = await processPostTreeUserCallback(formattedBody);

    if (!data) res.status(404).json({ error: 'Failed to find tree' });

    res.status(200).json(data);
  }
});

module.exports = treeuserRouter;
