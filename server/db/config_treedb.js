const configTreeDB = {
  // connectionLimit: 10, // what does this mean?
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  // dateStrings: 'date',
  // connect_timeout: 10,
};

const configPgNative = `
host=${configTreeDB.host}
dbname=${configTreeDB.database}
user=${configTreeDB.user}
password=${configTreeDB.password}
port=${configTreeDB.port}
connect_timeout=${configTreeDB.connect_timeout}
`;

// console.log(configTreeDB,'configTreeDB', ' configPgNative', configPgNative);
module.exports = { configTreeDB, configPgNative };
