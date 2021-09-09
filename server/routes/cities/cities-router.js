const citiesRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const { findAllCities, findCityByName } = require('./cities-queries');

citiesRouter.get('/', async (req, res) => {
  const { city } = req.query;

  let cities = null;

  if (city) {
    cities = await findCityByName(city);
  } else {
    cities = await findAllCities();
  }

  if (!cities) {
    throw new AppError(404, 'Failed to find any cities.');
  }

  res.status(200).json(cities);
});

module.exports = citiesRouter;
