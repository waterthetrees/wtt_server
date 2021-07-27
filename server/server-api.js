const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const parser = require('body-parser');
const compression = require('compression');
const { verbose } = require('../logger.js');
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const {
  getCitiesRequest,
  getTodaysTrees,
  getTree,
  getTreeList,
  postTree,
  updateTree,
  getTreeHistory,
  postTreeHistory,
  postUser,
  postTreeUser,
  getTreeUser,
} = require('./controllers/controller.js');

const { getUserCounts } = require('./controllers/user-counts');

const { getUserTreeHistory } = require('./controllers/user-tree-history');

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
  development: 3002, blue: 3004, production: 3002, local: 3002, dockerlocal: 3002,
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
app.use(morgan('development'));
app.use(parser.json());
// Retrieve the raw body as a buffer and match all content types
app.use(require('body-parser').raw({ type: '*/*' }));

app.use(cors(options));

// ROUTES
app.use('/', router);

router.route('/api/tree')
  .get(getTree)
  .put(updateTree)
  .post(postTree);

router.route('/api/treelist')
  .get(getTreeList);

router.route('/api/treemap')
  .get(getTodaysTrees);

router.route('/api/cities')
  .get(getCitiesRequest);

router.route('/api/treehistory')
  .get(getTreeHistory)
  .post(postTreeHistory);

router.route('/api/user')
  .post(postUser)

router.route('/api/treeuser')
  .get(getTreeUser)
  .post(postTreeUser);

router.route('/api/usertreehistory')
  .get(getUserTreeHistory);

router.route('/api/usercounts')
  .get(getUserCounts);

const httpServer = http.createServer(app);
httpServer.listen(port, () => verbose(`${host}:${port}`));
