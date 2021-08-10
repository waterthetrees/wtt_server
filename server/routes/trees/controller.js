const treesRouter = require('express').Router();
const treesModel = require('./model');
const utils = require('./utils');

treesRouter.get('/', async (req, res) => {
  try {
    const { currentTreeId } = req.query;

    if (Number.isNaN(Number(currentTreeId))) {
      return res.status(500).send({
        error: 'Missing required query param: currentTreeId',
      });
    }

    const results = await treesModel.getTree(currentTreeId);

    if (results.rows.length !== 1) {
      return res
        .status(404)
        .send({ error: `Could not find the tree with id ${currentTreeId}` });
    }

    const tree = results.rows[0];
    tree.healthNum = utils.convertHealthToNumber(tree.health);

    return res.status(200).json(tree);
  } catch (err) {
    return res.status(500).send({ error: err.message });
  }
});

module.exports = treesRouter;
