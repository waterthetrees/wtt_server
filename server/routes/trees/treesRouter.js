const treesRouter = require('express').Router();
const cities = require('../cities/citiesQueries');
const sharedRoutesUtils = require('../sharedRoutesUtils');
const treeHistory = require('../treehistory/treehistoryQueries');
const trees = require('./treesQueries');
const { validatePostTree } = require('./treesValidations');

treesRouter.get('/', async (req, res) => {
  const { currentTreeId } = req.query;

  if (!currentTreeId) {
    res.status(400).send({
      error: 'Missing required parameter(s): currentTreeId',
    });
  }

  const tree = await trees.findTreeById(currentTreeId);

  res.status(200).json(tree);
});

treesRouter.post('/', async (req, res) => {
  const validated = validatePostTree(req);

  if (!validated) res.status(400).json({ error: 'Missing required inputs' });

  // TODO: bug - tree_type should be a column in the treedata table
  // ERROR: column "tree_type" of relation "treedata" does not exist
  delete req.body.treeType;

  const convertedTreeData = sharedRoutesUtils.convertObjectToSnakeCase(
    req.body
  );
  const tree = await trees.addTree(convertedTreeData);
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
    res.status(400).json({ error: 'Missing required parameter: idTree' });
  }

  const convertedTreeData = sharedRoutesUtils.convertObjectToSnakeCase(body);

  const updatedTree = await trees.updateTreeById(convertedTreeData, idTree);

  return res.status(200).json(updatedTree);
});

module.exports = treesRouter;
