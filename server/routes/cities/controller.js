const citiesRouter = require('express').Router();
const citiesModel = require('./model');

citiesRouter.get('/', async (req, res) => {
  const foundCities = await citiesModel.getCities(req.query.city);

  return res.status(200).json(foundCities);
});

module.exports = citiesRouter;
