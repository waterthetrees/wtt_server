/**
 * https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax
 */
const dbConfig = {
  host: process.env.POSTGRES_HOST || 'wtt_postgis',
  port: process.env.POSTGRES_PORT || 5432,
  database: process.env.POSTGRES_DB || 'treedb',
  user: process.env.POSTGRES_USER || 'trees',
  password: process.env.POSTGRES_PASSWORD || 'trees3r4t',
};

module.exports = dbConfig;
