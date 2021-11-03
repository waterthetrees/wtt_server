const treesRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const {
  createCity,
  findCityByName,
  updateCityTreeCount,
} = require('../cities/cities-queries');
const treeHistory = require('../treehistory/treehistory-queries');
const { createTree, findTreeById, updateTreeById } = require('./trees-queries');
const { validatePostTree } = require('./trees-validations');

treesRouter.get('/', async (req, res) => {
  const { currentTreeId } = req.query;

  if (!currentTreeId) {
    throw new AppError(400, 'Missing required parameter: currentTreeId.');
  }

  const tree = await findTreeById(currentTreeId);

  res.status(200).json(tree);
});

treesRouter.post('/', async (req, res) => {
  const validated = validatePostTree(req);

  if (!validated) {
    throw new AppError(400, 'Missing required parameter(s).');
  }

  const tree = await createTree(req.body);
  const { city, lng, lat, email, who } = tree;
  const foundCity = await findCityByName(city);
  const isNewCity = city && !foundCity;

  if (isNewCity) {
    const newCity = { city, lng, lat, email, who };

    await createCity(newCity);
  }

  await updateCityTreeCount(city);

  const firstTreeHistory = {
    id_tree: tree.idTree,
    date_visit: tree.dateVisit,
    comment: `THIS ${tree.common.toUpperCase()} IS PLANTED!!!`,
    volunteer: tree.volunteer,
  };

  await treeHistory.createTreeHistory(firstTreeHistory);

  res.status(201).json(tree);
});

treesRouter.put('/', async (req, res) => {
  const { idTree, ...body } = req.body;

  if (!idTree) {
    throw new AppError(400, 'Missing required parameter: idTree.');
  }

  const updatedTree = await updateTreeById(body, idTree);

  res.status(200).json(updatedTree);
});

module.exports = treesRouter;
