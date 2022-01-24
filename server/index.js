const http = require('http');
const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '/.env') });
require('dotenv').config()
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const logger = require('../logger');
const unknownEndpointHandler = require('./middleware/unknown-endpoint-handler');
const expressErrorHandler = require('./middleware/express-error-handler');

const citiesRouter = require('./routes/cities/cities-router');
const countriesRouter = require('./routes/countries/countries-router');
const csvRouter = require('./routes/csv/csv-router');
const treeadoptionsRouter = require('./routes/treeadoptions/treeadoptions-router');
const treehistoryRouter = require('./routes/treehistory/treehistory-router');
const treelikesRouter = require('./routes/treelikes/treelikes-router');
const treemapRouter = require('./routes/treemap/treemap-router');
const treesRouter = require('./routes/trees/trees-router');
const usercountsRouter = require('./routes/usercounts/usercounts-router');
const usersRouter = require('./routes/users/users-router');
const usertreehistoryRouter = require('./routes/usertreehistory/usertreehistory-router');

// these are for various environments when we move to dev and live server vs local
const env = process.argv[2] || 'local';

const host = {
  production: 'http://localhost',
  development: 'http://localhost',
  blue: 'http://localhost',
  local: 'http://localhost',
  dockerlocal: 'http://localhost',
}[env];

const port = {
  development: 3002,
  blue: 3004,
  production: 3002,
  local: 3002,
  dockerlocal: 3002,
}[env];

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
// for logging on command line
app.use(morgan('dev'));
app.use(bodyParser.json());
// Retrieve the raw body as a buffer and match all content types
app.use(bodyParser.raw({ type: '*/*' }));

app.use(cors(options));

// ROUTES
app.use('/api/cities', citiesRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/csv', csvRouter);
app.use('/api/treeadoptions', treeadoptionsRouter);
app.use('/api/treehistory', treehistoryRouter);
app.use('/api/treelikes', treelikesRouter);
app.use('/api/treemap', treemapRouter);
app.use('/api/trees', treesRouter);
app.use('/api/usercounts', usercountsRouter);
app.use('/api/users', usersRouter);
app.use('/api/usertreehistory', usertreehistoryRouter);

app.use(unknownEndpointHandler);
app.use(expressErrorHandler);

const httpServer = http.createServer(app);
httpServer.listen(port, () => logger.verbose(`${host}:${port}`));
