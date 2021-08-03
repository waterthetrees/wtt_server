const { Pool } = require('pg');

const config = {
  host: process.env.POSTGRES_TESTING_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
};

module.exports = new Pool(config);
