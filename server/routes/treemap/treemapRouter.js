const treemapRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const treemapQueries = require('./treemapQueries');

treemapRouter.get('/', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    throw new AppError(400, 'Missing required parameter: city.');
  }

  const geoJSON = await treemapQueries.getGeoJSON(city);
  const data = geoJSON.jsonbBuildObject;

  res.status(200).json(data);
});

module.exports = treemapRouter;
