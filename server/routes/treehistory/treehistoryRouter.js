const treehistoryRouter = require('express').Router();
const sharedRoutesUtils = require('../sharedRoutesUtils');
const treeHistory = require('./treehistoryQueries');

treehistoryRouter.get('/', async (req, res) => {
  const { currentTreeId } = req.query;

  if (!currentTreeId) {
    res
      .status(400)
      .json({ error: 'Missing required parameter: currentTreeId' });
  }

  const foundTreeHistory = await treeHistory.findTreeHistoryByTreeId(
    currentTreeId
  );

  res.status(200).json(foundTreeHistory);
});

treehistoryRouter.post('/', async (req, res) => {
  const { idTree, volunteer } = req.body;

  if (!idTree) {
    res.status(400).json({ error: 'Missing required parameter: idTree' });
  }

  const formattedRequestBody = sharedRoutesUtils.convertObjectToSnakeCase(
    req.body
  );

  const todaysTreeHistory =
    await treeHistory.findTodaysTreeHistoryByTreeIdAndVolunteerName(
      idTree,
      volunteer
    );

  if (!todaysTreeHistory) {
    const newTreeHistory = await treeHistory.addTreeHistory(
      formattedRequestBody
    );

    if (!newTreeHistory) {
      res.status(400).json({ error: 'Failed to create new tree history' });
    }

    res.status(201).json({ newTreeHistory });
  } else {
    const updatedTreeHistory = await treeHistory.updateTreeHistory(
      formattedRequestBody
    );

    if (!updatedTreeHistory) {
      res.status(400).json({ error: 'Failed to update tree history ' });
    }

    res.status(200).json(updatedTreeHistory);
  }
});

module.exports = treehistoryRouter;
