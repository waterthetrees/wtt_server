const countriesRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const { getCountries } = require('./countries-queries');

countriesRouter.get('/', async (req, res) => {
  const { rows } = await getCountries();

  if (!rows?.length) {
    return res.status(404).json({ error: "Failed to get countries." });
  }

  // otherwise return data
  return res.status(200).json(rows);
});

async function getCountriesRequest(req, res) {
  // get data
  const { rows } = await getCountries();

  // if no data return error message
  if (!rows?.length) {
    return res.status(404).json({ error: "Failed to get countries." });
  }

  // otherwise return data
  return res.status(200).json(rows);
}

module.exports = countriesRouter;
