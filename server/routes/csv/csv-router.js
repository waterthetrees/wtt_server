const csvRouter = require('express').Router();
const fastcsv = require("fast-csv");
const fs = require("fs");
const AppError = require('../../errors/AppError');
const { getAllTreeDataByCity } = require('./csv-queries');

csvRouter.get('/', async (req, res) => {
  const { city } = req.query;
  const data = await getAllTreeDataByCity(city);

  if (!data) {
    throw new AppError(404, 'Failed to find any data.');
  }

  const jsonData = JSON.parse(JSON.stringify(data));
  const cityPath = `server/csv-downloads/${city.toLowerCase()}.csv`;
  const ws = fs.createWriteStream(cityPath);

  fastcsv
    .write(jsonData, { headers: true })
    .on("finish", () => {
      res.download(cityPath)
    })
    .pipe(ws);

  
});

module.exports = csvRouter;


