
import express from 'express';
import AppError from '../../errors/AppError.js';
import {
  createCity,
  findCityByName,
  updateCityTreeCount,
} from '../cities/cities-queries.js';
import * as treeHistory from '../treehistory/treehistory-queries.js';
import { createTree, findTreeById, updateTreeById } from './trees-queries.js';
import * as validateTrees from './trees-validations.js';
import { createIdForTree } from '../treeid/id.js';
import * as treeUtils from './trees-utils.js';

const treesRouter = express.Router();

treesRouter.get('/', async (req, res) => {

  const validated = validateTrees.validateGetTree(req?.query);
  if (!validated) {
    throw new AppError(400, 'Need id or city, address, ref or lng, lat in query');
  }
  const { id, city, address, id_reference: ref, lng, lat } = req?.query;
  const cityFormatted = treeUtils.capEachWord(city);
  const tree = await findTreeById(id, cityFormatted, address, id_reference, lng, lat);
  if (!tree.id) { 
    res.status(404).json({id, error: `Tree ${id} not found`});
  }

  res.status(200).json(tree);
});

treesRouter.post('/', async (req, res) => {
  const validated = validateTrees.validatePostTree(req);

  if (!validated) {
    throw new AppError(400, 'Missing required parameter(s).');
  }

  const id = createIdForTree(req.body);
  const data = {...req.body, id}
  const tree = await createTree(data);
  const { city, lng, lat, email, who } = tree;
  const foundCity = await findCityByName(city);
  const isNewCity = city && !foundCity;

  if (isNewCity) {
    const newCity = { city, lng, lat, email, who };

    await createCity(newCity);
  }

  await updateCityTreeCount(city);

  const firstTreeHistory = {
    id: tree.id,
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
    throw new AppError(400, 'Missing required parameter: id.');
  }

  const updatedTree = await updateTreeById(body, id);

  res.status(200).json(updatedTree);
});

export default treesRouter;
