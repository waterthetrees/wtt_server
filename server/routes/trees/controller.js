const treesRouter = require('express').Router();
const treesModel = require('./model');
const utils = require('./utils');
const { validatePostTree } = require('./validation');

treesRouter.get('/', async (req, res) => {
  const { currentTreeId } = req.query;

  if (Number.isNaN(Number(currentTreeId))) {
    return res.status(400).send({
      error: 'Missing required query param: currentTreeId',
    });
  }
  try {
    const tree = await treesModel.getTree(currentTreeId);

    tree.healthNum = utils.convertHealthToNumber(tree.health);

    return res.status(200).json(tree);
  } catch (err) {
    return res.status(404).send({ error: err.message });
  }
});

treesRouter.post('/', async (req, res) => {
  const validated = validatePostTree(req);

  if (!validated)
    return res.status(400).json({ error: 'Missing required inputs' });

  try {
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

    return res.status(201).json(tree);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = treesRouter;
