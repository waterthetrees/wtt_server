const treehistoryRouter = require('express').Router();
const AppError = require('../../errors/AppError');
const treeHistory = require('./treehistory-queries');

treehistoryRouter.get('/', async (req, res) => {
  const { currentTreeId } = req.query;

  if (!currentTreeId) {
    throw new AppError(400, 'Missing required parameter: currentTreeId.');
  }

  const foundTreeHistory = await treeHistory.findTreeHistoryByTreeId(
    currentTreeId
  );

  res.status(200).json(foundTreeHistory);
});

treehistoryRouter.post('/', async (req, res) => {
  const { idTree, volunteer } = req.body;

  if (!idTree || !volunteer) {
    throw new AppError(
      400,
      'Missing required parameter(s): idTree or volunteer.'
    );
  }

  const todaysTreeHistory =
    await treeHistory.findTodaysTreeHistoryByTreeIdAndVolunteerName(
      idTree,
      volunteer
    );

  if (!todaysTreeHistory) {
    const newTreeHistory = await treeHistory.addTreeHistory(req.body);

    if (!newTreeHistory) {
      throw new AppError(400, 'Failed to create new tree history.');
    }

    res.status(201).json({ newTreeHistory });
  } else {
    const updatedTreeHistory = await treeHistory.updateTreeHistory(req.body);

    if (!updatedTreeHistory) {
      throw new AppError(400, 'Failed to update tree history.');
    }

    res.status(200).json(updatedTreeHistory);
  }
});

module.exports = treehistoryRouter;
