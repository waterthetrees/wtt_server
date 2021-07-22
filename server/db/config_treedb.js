const env = process.argv[2] || 'local';

const configTreeDB = {
    connectionLimit: 10, // what does this mean?
    host: process.env.DATABASE_HOST || 'postgis-wtt',
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT || 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    dateStrings: 'date',
    connect_timeout: 10,
  },
  dockercl: {
    connectionLimit: 10, // what does this mean?
    database: 'treedb',
    user: 'trees',
    host: '127.0.0.1',
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
    database: 'treedbblue',
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

//console.log(configTreeDB,'configTreeDB', ' configPgNative', configPgNative);
module.exports = { configTreeDB, configPgNative };
