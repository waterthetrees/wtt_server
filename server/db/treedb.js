const { Pool } = require('pg');
const { configTreeDB } = require('./config_treedb.js');

const pool = new Pool(configTreeDB);

async function queryTreeDB(queryString, functionCallerName) {
  try {
    const results = await pool.query(queryString);

    return results;
  } catch (err) {
    error(`Error executing query to treeDB: ${err}, ${functionCallerName}`);

    return err;
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  queryTreeDB,
};
