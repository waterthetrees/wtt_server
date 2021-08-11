const treesRouter = require('express').Router();
const treesModel = require('./model');
const utils = require('./utils');
const { validatePostTree } = require('./validation');

treesRouter.get('/', async (req, res) => {
  const { currentTreeId } = req.query;

  if (Number.isNaN(Number(currentTreeId))) {
    res.status(400).send({
      error: 'Missing required query param: currentTreeId',
    });
  }

  const tree = await treesModel.getTree(currentTreeId);

  res.status(200).json(tree);
});

treesRouter.post('/', async (req, res) => {
  const validated = validatePostTree(req);

  if (!validated) res.status(400).json({ error: 'Missing required inputs' });

  // TODO: bug - tree_type should be a column in the treedata table
  // ERROR: column "tree_type" of relation "treedata" does not exist
  delete req.body.treeType;

  const convertedTreeData = utils.convertObjectToSnakeCase(req.body);
  const tree = await treesModel.insertTreeModel(convertedTreeData);
  const foundCity = await treesModel.getCityExistence(tree.city);
  const isNewCity = tree.city && !foundCity;

  if (isNewCity) {
    await treesModel.insertNewCityModel(tree);
  }

  await treesModel.updateCitiesTreeCount(tree.city);

  const firstTreeHistory = {
    id_tree: tree.idTree,
    date_visit: tree.dateVisit,
    comment: `THIS ${tree.common.toUpperCase()} IS PLANTED!!!`,
    volunteer: tree.volunteer,
  };

  await treesModel.insertTreeHistoryModel(firstTreeHistory);

  res.status(201).json(tree);
});

module.exports = treesRouter;
