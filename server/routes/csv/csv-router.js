import fastcsv from 'fast-csv';
import fs from 'fs';
import express from 'express';
import AppError from '../../errors/AppError.js';

import getAllTreeDataByCity from './csv-queries.js';

const csvRouter = express.Router();

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

export default csvRouter;


