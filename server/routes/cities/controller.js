const citiesRouter = require('express').Router();
const citiesModel = require('./model');

citiesRouter.get('/', async (req, res) => {
  try {
    const foundCities = await citiesModel.getCities(req.query.city);

    if (!foundCities) {
      return res.status(404).json({ error: 'Failed to get cities' });
    }

    return res.status(200).json(foundCities);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
});

module.exports = citiesRouter;
