import express from 'express';
import AppError from '../../errors/AppError.js';
import {
  createCity,
  findCityByName,
  updateCityTreeCount,
} from '../cities/cities-queries.js';
import * as treeHistory from '../treehistory/treehistory-queries.js';
import { createTree, findTreeById, updateTreeById } from './trees-queries.js';
import validatePostTree from './trees-validations.js';
import { createIdForTree } from '@waterthetrees/tree-id';

import convertHealthToNumber from './trees-utils.js';

const treesRouter = express.Router();

treesRouter.get('/', async (req, res) => {
  const { id } = req.query;
  if (!id) {
    throw new AppError(400, 'Get Tree: Need to send id in query');
  }
  const tree = await findTreeById(id);

  if (tree) {
    tree.healthNum = convertHealthToNumber(tree.health);
  }

  res.status(200).json(tree ?? {});
});

treesRouter.post('/', async (req, res) => {
  const validated = validatePostTree(req);
  if (!validated) {
    throw new AppError(
      400,
      'Post Tree: Missing required parameter(s): common, scientific, city, lat, lng.',
    );
  }
  const {
    common,
    scientific,
    genus,
    lat,
    lng,
    sourceId,
    address,
    city,
    country,
    neighborhood,
    height,
    dbh,
    health,
    who,
    email,
    owner,
    volunteer,
    notes,
    waterFreq,
    irrigation,
    datePlanted,
    download: url,
    ref: idReference,
    count: locationTreeCount,
  } = req.body;

  if (req.body.id) {
    const treeExists = await findTreeById(req.body.id);
    if (treeExists.code !== 0) {
      res.status(200);
      return;
    }
  }

  const id = req.body.id ? req.body.id : createIdForTree(req.body);

  const data = {
    id,
    common,
    scientific,
    genus,
    lat,
    lng,
    sourceId,
    address,
    city,
    country,
    neighborhood,
    height,
    dbh,
    health,
    who,
    email,
    owner,
    volunteer,
    notes,
    waterFreq,
    irrigation,
    url,
    idReference,
    datePlanted,
    locationTreeCount,
  };
  const tree = await createTree(data);

  const foundCity = await findCityByName(city);
  const isNewCity = city && !foundCity;

  if (isNewCity) {
    const newCity = { city, lng, lat, email, who };
    await createCity(newCity);
  }

  await updateCityTreeCount(city);

  const firstTreeHistory = {
    id,
    date_visit: tree.dateVisit,
    comment: `THIS ${tree.common.toUpperCase()} IS PLANTED!!!`,
    volunteer: tree.volunteer,
  };

  await treeHistory.createTreeHistory(firstTreeHistory);

  res.status(201).json(tree);
});

treesRouter.put('/', async (req, res) => {
  const { id, ...body } = req.body;

  if (!id) {
    throw new AppError(400, 'treesRouter.put Missing required parameter: id.');
  }

  const updatedTree = await updateTreeById(body, id);

  res.status(200).json(updatedTree);
});

export default treesRouter;
