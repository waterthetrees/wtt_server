const citiesRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const cities = require('./citiesQueries');

citiesRouter.get('/', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    throw new AppError(400, 'Missing required parameter: city.');
  }

  const foundCities = await cities.findCitiesByName(city);

  if (!foundCities) {
    throw new AppError(404, 'Failed to find cities.');
  }

  res.status(200).json(foundCities);
});

module.exports = citiesRouter;
