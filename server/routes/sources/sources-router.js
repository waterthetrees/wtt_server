import express from 'express';
import AppError from '../../errors/AppError.js';
import {
  findSourceCountry,
  updateSourceById,
  createSource,
  createCrosswalk,
  getAllSources,
} from './sources-queries.js';

const sourcesRouter = express.Router();

sourcesRouter.get('/', async (req, res) => {
  const { id, country } = req.query;

  const idSource = !id ? '*' : id;
  const source = !country
    ? await getAllSources()
    : await findSourceCountry(country, idSource);
  res.status(200).json(source ?? {});
});

sourcesRouter.post('/', async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { crosswalk, ...source } = req.body;
  const responseSource = await createSource(source);
  if (!responseSource) throw new AppError(400, 'Error creating source');
  if (crosswalk) {
    const responseCrosswalk = await createCrosswalk({
      id: source.id,
      ...crosswalk,
    });
    if (!responseCrosswalk) throw new AppError(400, 'Error creating Crosswalk');
  }

  res.status(201).json(responseSource);
});

sourcesRouter.put('/', async (req, res) => {
  const { id, ...body } = req.body;

  if (!id) {
    throw new AppError(
      400,
      'sourcesRouter.put Missing required parameter: id.',
    );
  }

  const updatedSource = await updateSourceById(body, id);

  res.status(200).json(updatedSource);
});

export default sourcesRouter;
