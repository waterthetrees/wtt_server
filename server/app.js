import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import expressErrorHandler from './middleware/express-error-handler.js';
import unknownEndpointHandler from './middleware/unknown-endpoint-handler.js';

import citiesRouter from './routes/cities/cities-router.js';
import countriesRouter from './routes/countries/countries-router.js';
import csvRouter from './routes/csv/csv-router.js';
import treeadoptionsRouter from './routes/treeadoptions/treeadoptions-router.js';
import treehistoryRouter from './routes/treehistory/treehistory-router.js';
import treeidRouter from './routes/treeid/treeid-router.js';
import treelikesRouter from './routes/treelikes/treelikes-router.js';
import treemapRouter from './routes/treemap/treemap-router.js';
import treesRouter from './routes/trees/trees-router.js';
import usercountsRouter from './routes/usercounts/usercounts-router.js';
import { usersRoute } from './routes/users/index.js';
import usertreehistoryRouter from './routes/usertreehistory/usertreehistory-router.js';

export function startServer() {
  // this is for whitelisting hosts for cors
  const whitelist = [
    'https://blue.waterthetrees.com',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3004',
    'https://dev.waterthetrees.com',
    'https://waterthetrees.com',
    'https://www.waterthetrees.com',
  ];

  const options = {
    origin(origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  const app = express();

  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // for logging on command line
  app.use(morgan('dev'));
  app.use(cors(options));

  // ROUTES

  app.use('/api/treemap', treemapRouter);
  app.use('/api/trees', treesRouter);
  app.use('/api/cities', citiesRouter);
  app.use('/api/countries', countriesRouter);
  app.use('/api/csv', csvRouter);
  app.use('/api/treeadoptions', treeadoptionsRouter);
  app.use('/api/treehistory', treehistoryRouter);
  app.use('/api/treelikes', treelikesRouter);
  app.use('/api/treeid', treeidRouter);
  app.use('/api/usercounts', usercountsRouter);
  // app.use('/api/users', usersRouter);
  app.use('/api/users', usersRoute);
  app.use('/api/usertreehistory', usertreehistoryRouter);

  app.use(unknownEndpointHandler);
  app.use(expressErrorHandler);

  return app;
}
