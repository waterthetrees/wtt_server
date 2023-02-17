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
  const { country, source, sources } = req.query;
  const { idSourceName } = source ?? {};
  if (sources === 'All') {
    const foundSources = await getAllSources();
    if (!foundSources || foundSources.length === 0)
      throw new AppError(400, 'Error getting source');
    res.status(200).json(foundSources ?? {});
  }

  if (idSourceName) {
    console.log('idSourceName', idSourceName);
    const responseByIdSourceName = await getSourceByIdSourceName(idSourceName);
    console.log('responseByIdSourceName', responseByIdSourceName);
    if (!responseByIdSourceName || responseByIdSourceName.length === 0)
      throw new AppError(400, 'Error getting source');
    res.status(200).json(responseByIdSourceName ?? {});
  }

  if (country) {
    const responseSourceCountry = await findSourceCountry(country);
    if (!responseSourceCountry || responseSourceCountry.length === 0)
      throw new AppError(400, 'Error getting source');
    res.status(200).json(responseSourceCountry ?? {});
  }
});

sourcesRouter.post('/', async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { crosswalk, source } = req.body;

  const responseSource = await createSource(source);
  if (!responseSource || responseSource.length === 0)
    throw new AppError(400, 'Error creating source');

  const responseCrosswalk = await createCrosswalk({
    idSourceName: source.idSourceName,
    ...crosswalk,
  });
  if (!responseCrosswalk || responseCrosswalk.length === 0)
    throw new AppError(400, 'Error creating Crosswalk');

  res.status(200).json(responseSource ?? {});
});

sourcesRouter.put('/', async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { crosswalk, source } = req.body;
  //validate source and crosswalk

  const responseSource = await updateSourceByIdSourceName(source);
  if (!responseSource) throw new AppError(400, 'Error creating source');

  const responseCrosswalk = await updateCrosswalkByIdSourceName(
    crosswalk,
    source.idSourceName,
  );

  if (!responseCrosswalk) throw new AppError(400, 'Error creating Crosswalk');

  res.status(200).json(
    { source: responseSource, crosswalk: responseCrosswalk } ?? {
      message: 'No data to update',
    },
  );
});

export default sourcesRouter;
