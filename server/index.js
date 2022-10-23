import http from 'http';
import logger from '../logger.js';
import { startServer } from './app.js';

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

const app = startServer();
const httpServer = http.createServer(app);
httpServer.listen(port, () => logger.verbose(`${host}:${port}`));
