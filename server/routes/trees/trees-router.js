const treesRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const cities = require('../cities/cities-queries');
const treeHistory = require('../treehistory/treehistory-queries');
const trees = require('./trees-queries');
const { validatePostTree } = require('./trees-validations');

treesRouter.get('/', async (req, res) => {
  const { currentTreeId } = req.query;

  if (!currentTreeId) {
    throw new AppError(400, 'Missing required parameter: currentTreeId.');
  }

  const tree = await trees.findTreeById(currentTreeId);

  res.status(200).json(tree);
});

treesRouter.post('/', async (req, res) => {
  const validated = validatePostTree(req);

  if (!validated) {
    throw new AppError(400, 'Missing required parameter(s).');
  }

  const tree = await trees.addTree(req.body);
  const foundCity = await cities.findCitiesByName(tree.city);
  const isNewCity = tree.city && !foundCity;

  if (isNewCity) {
    await cities.addCity(tree);
  }

  await cities.updateCityTreeCount(tree.city);

  const firstTreeHistory = {
    id_tree: tree.idTree,
    date_visit: tree.dateVisit,
    comment: `THIS ${tree.common.toUpperCase()} IS PLANTED!!!`,
    volunteer: tree.volunteer,
  };

  await treeHistory.addTreeHistory(firstTreeHistory);

  res.status(201).json(tree);
});

treesRouter.put('/', async (req, res) => {
  const { idTree, ...body } = req.body;

  if (!idTree) {
    throw new AppError(400, 'Missing required parameter: idTree.');
  }

  const updatedTree = await trees.updateTreeById(body, idTree);

  res.status(200).json(updatedTree);
});

module.exports = treesRouter;
