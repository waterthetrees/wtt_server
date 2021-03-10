const env = process.argv[2] || 'local';

const configTreeDB = {
  dockerlocal: {
    connectionLimit: 10, // what does this mean?
    database: 'treedb',
    user: 'postgres',
    host: 'postgres-wtt',
    password: 'trees3r4t',
    port: 5432,
    dateStrings: 'date',
    connect_timeout: 10,
  },
  local: {
    connectionLimit: 10, // what does this mean?
    database: 'treedb',
    user: 'trees',
    host: 'localhost',
    password: 'trees3r4t',
    port: 5432,
    dateStrings: 'date',
    connect_timeout: 10,
  },
  dev: {
    connectionLimit: 10, // what does this mean?
    database: 'treedb',
    user: 'trees',
    host: 'localhost',
    password: 'trees3r4t',
    port: 5432,
    dateStrings: 'date',
    connect_timeout: 10,
  },
  blue: {
    connectionLimit: 10, // what does this mean?
    database: 'treedbdev',
    user: 'trees',
    host: 'localhost',
    password: 'trees3r4t',
    port: 5432,
    dateStrings: 'date',
    connect_timeout: 10,
  },
  prod: {
    connectionLimit: 10, // what does this mean?
    database: 'treedb',
    user: 'trees',
    host: 'localhost',
    password: 'trees3r4t',
    port: 5432,
    dateStrings: 'date',
    connect_timeout: 10,
  },
}[env];

const configPgNative = `
  host=${configTreeDB.host}
  dbname=${configTreeDB.database}
  user=${configTreeDB.user}
  password=${configTreeDB.password}
  port=${configTreeDB.port}
  connect_timeout=${configTreeDB.connect_timeout}`;

// console.log(configTreeDB,'configTreeDB', ' configPgNative', configPgNative);
module.exports = { configTreeDB, configPgNative };
