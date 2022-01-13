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
const { createIdForTree } = require('./id');

treesRouter.get('/', async (req, res) => {
  const { id } = req.query;

  if (!id) {
    throw new AppError(400, 'Missing required parameter: id.');
  }

  const tree = await findTreeById(id);

  res.status(200).json(tree);
});

treesRouter.post('/', async (req, res) => {
  const validated = validatePostTree(req);

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

module.exports = treesRouter;
