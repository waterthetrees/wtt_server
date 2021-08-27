const treemapRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const { findGeoJSONByCityName } = require('./treemap-queries');

treemapRouter.get('/', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    throw new AppError(400, 'Missing required parameter: city.');
  }

  const geoJSON = await findGeoJSONByCityName(city);

  res.status(200).json(geoJSON);
});

module.exports = treemapRouter;
