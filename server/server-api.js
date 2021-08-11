const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const { verbose } = require('../logger');
const {
  getTodaysTrees,
  getTreeList,
  updateTree,
  getTreeHistory,
  postTreeHistory,
  postUser,
  postTreeUser,
  getTreeUser,
} = require('./controller');
const citiesRouter = require('./routes/cities/controller');
const treesRouter = require('./routes/trees/controller');
const middleware = require('./utils/middleware');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

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
const router = express.Router();

app.use(compression());
// for logging on command line
app.use(morgan('dev'));
app.use(bodyParser.json());
// Retrieve the raw body as a buffer and match all content types
app.use(bodyParser.raw({ type: '*/*' }));

app.use(cors(options));

// ROUTES
app.use('/', router);

app.use('/api/tree', treesRouter);
app.use('/api/cities', citiesRouter);

router.route('/api/tree')
  .put(updateTree)

router.route('/api/treelist')
  .get(getTreeList);

router.route('/api/treemap')
  .get(getTodaysTrees);

router.route('/api/treehistory')
  .get(getTreeHistory)
  .post(postTreeHistory);

router.route('/api/user')
  .post(postUser);

router.route('/api/treeuser')
  .get(getTreeUser)
  .post(postTreeUser);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const httpServer = http.createServer(app);
httpServer.listen(port, () => verbose(`${host}:${port}`));
