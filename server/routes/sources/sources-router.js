import express from 'express';
import AppError from '../../errors/AppError.js';
import {
  findSourceCountry,
  getSourceByIdSourceName,
  updateSourceByIdSourceName,
  createSource,
  createCrosswalk,
  getAllSources,
  updateCrosswalkByIdSourceName,
} from './sources-queries.js';

const sourcesRouter = express.Router();

sourcesRouter.get('/', async (req, res) => {
  const { idSourceName, country, source } = req.query;

  if (source === 'All') {
    const source = await getAllSources();
    res.status(200).json(source ?? {});
  }

  if (idSourceName) {
    const source = await getSourceByIdSourceName(idSourceName);
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
  const { idSourceName } = source;
  const foundSource = await getSourceByIdSourceName(idSourceName);

  const response = {};
  if (foundSource) {
    const responseSource = await updateSourceByIdSourceName(source);
    if (!responseSource) throw new AppError(400, 'Error creating source');
    response.source = await responseSource;

    if (crosswalk) {
      const responseCrosswalk = await updateSourceByIdSourceName({
        idSourceName,
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

  const response = await createSource(source);
  if (!response) throw new AppError(400, 'Error creating source');
  if (crosswalk) {
    const responseCrosswalk = await createCrosswalk({
      idSourceName: source.idSourceName,
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

  const response = await updateSourceByIdSourceName(source);
  if (!response) throw new AppError(400, 'Error creating source');

  const responseCrosswalk = await updateCrosswalkByIdSourceName(
    crosswalk,
    source.idSourceName,
  );

  if (!responseCrosswalk) throw new AppError(400, 'Error creating Crosswalk');

  res.status(200).json(
    { response, ...{ crosswalk: responseCrosswalk } } ?? {
      message: 'No data to update',
    },
  );
});

export default sourcesRouter;
