import express from 'express';
import AppError from '../../errors/AppError.js';
import {
  findSourceCountry,
  getSourceById,
  updateSourceById,
  createSource,
  createCrosswalk,
  getAllSources,
  updateCrosswalkById,
} from './sources-queries.js';

const sourcesRouter = express.Router();

sourcesRouter.get('/', async (req, res) => {
  const { id, country, source } = req.query;
  console.log('req.query', req.query);

  if (source === 'All') {
    const source = await getAllSources();
    res.status(200).json(source ?? {});
  }

  if (id) {
    const source = await getSourceById(id);
    res.status(200).json(source ?? {});
  }

  if (country) {
    const source = await findSourceCountry(country);
    res.status(200).json(source ?? {});
  }
});

sourcesRouter.get('/', async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { crosswalk, source } = req.body;
  const { id } = source;
  const foundSource = await getSourceById(id);

  const response = {};
  if (foundSource) {
    const responseSource = await updateSourceById(source);
    if (!responseSource) throw new AppError(400, 'Error creating source');
    response.source = await responseSource;

    if (crosswalk) {
      const responseCrosswalk = await updateSourceById({
        id,
        ...crosswalk,
      });

      if (!responseCrosswalk)
        throw new AppError(400, 'Error creating Crosswalk');
      response.crosswalk = await responseCrosswalk;
    }
    res.status(200).json(responseSource ?? { message: 'No data to update' });
  }
});

sourcesRouter.post('/', async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { crosswalk, source } = req.body;
  console.log('sourcesRouter.post source', source);
  console.log('sourcesRouter.post crosswalk', crosswalk);

  const response = await createSource(source);
  if (!response) throw new AppError(400, 'Error creating source');
  if (crosswalk) {
    const responseCrosswalk = await createCrosswalk({
      id: source.id,
      ...crosswalk,
    });
    if (!responseCrosswalk) throw new AppError(400, 'Error creating Crosswalk');
  }

  res.status(200).json(response ?? { message: 'No data to update' });
});

sourcesRouter.put('/', async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { crosswalk, source } = req.body;
  //validate source and crosswalk
  console.log('sourcesRouter.put source', source);
  console.log('sourcesRouter.put crosswalk', crosswalk);

  const response = await updateSourceById(source);
  console.log('sourcesRouter.put response', response);
  if (!response) throw new AppError(400, 'Error creating source');

  const responseCrosswalk = await updateCrosswalkById(crosswalk, source.id);

  if (!responseCrosswalk) throw new AppError(400, 'Error creating Crosswalk');

  res.status(200).json(
    { response, ...{ crosswalk: responseCrosswalk } } ?? {
      message: 'No data to update',
    },
  );
});

export default sourcesRouter;
