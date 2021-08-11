const { configTreeDB } = require('./config_treedb');

function camelizeColumns(data) {
  const tmp = data[0];
  for (const prop in tmp) {
    const camel = pgp.utils.camelize(prop);
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
}

// TODO: snake case on query, camel case on return
const options = {
  capSQL: true,
  receive: (data) => camelizeColumns(data),
};

const pgp = require('pg-promise')(options);

const db = pgp(configTreeDB);

module.exports = db;
