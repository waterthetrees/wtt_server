const treeuserRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const sharedRoutesUtils = require('../sharedRoutesUtils');
const treeuserQueries = require('./treeuserQueries');
const { validateGetTreeuser } = require('./treeuserValidations');

treeuserRouter.get('/', async (req, res) => {
  const validated = validateGetTreeuser(req);

  if (!validated) {
    throw new AppError(
      400,
      'Missing required parameter(s): idTree, email, or request.'
    );
  }

  const { idTree, email, request } = req.query;

  const findTreeUserModelCallback =
    request === 'adopted'
      ? treeuserQueries.findTreeAdoptionModel
      : treeuserQueries.findTreeLikesModel;

  const rows = await findTreeUserModelCallback(idTree);

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

    if (rowCount !== 1) {
      throw new AppError(404, 'Failed to find tree.');
    }

    res.status(200).json({ success: true });
  } else {
    const formattedBody = sharedRoutesUtils.convertObjectToSnakeCase(body);
    const data = await processPostTreeUserCallback(formattedBody);

    res.status(200).json(data);
  }
});

module.exports = treeuserRouter;
