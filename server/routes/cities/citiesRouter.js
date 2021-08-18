const citiesRouter = require('express').Router();
const cities = require('./citiesQueries');

citiesRouter.get('/', async (req, res) => {
  const { city } = req.query.city;

  // if (!city) {
  //   res.status(400).json({ error: 'Missing required parameter: city' });
  // }

  const foundCities = await cities.findCitiesByName(req.query.city);

  if (!foundCities) {
    res.status(404).json({ error: 'Failed to find cities' });
  }

  res.status(200).json(foundCities);
});

module.exports = citiesRouter;
