// Schema created by Wes Warren, Ajay Anand, Victoria Tan, Rose Meyers, Steve


const env = process.argv[2] || 'dev';
const { Pool, Client } = require('pg');
const util = require('util');

const config = {
  local: {
    connectionLimit: 10,
    database: 'treedb', 
    user: 'trees',
    host: 'localhost',
    password: 'trees',
    port: 5432,
    dateStrings: 'date'
  }
}[env];
const pool = new Pool(config);
// planted, ref, who, lng, lat, common, scientific, owner, 
//       address, city, state, zip, neighborhood, health, notes, status

const queryStrings = [
  `CREATE TABLE IF NOT EXISTS volunteer(
    id_volunteer integer PRIMARY KEY,
    volunteername VARCHAR(255),
    email VARCHAR(255),
    zipcode VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,

  `CREATE TABLE IF NOT EXISTS treehistory_comment(
    id_treehistory_comment integer PRIMARY KEY,
    treeaction_comment VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,

  `CREATE TABLE IF NOT EXISTS treehistory_action(
    id_treehistory_action integer PRIMARY KEY,
    treehistory_action_name VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,

  `CREATE TABLE IF NOT EXISTS treehistory(
    id_treehistory SERIAL NOT NULL PRIMARY KEY,
    id_treehistory_action integer REFERENCES treehistory_action(id_treehistory_action),
    id_treehistory_comment integer REFERENCES treehistory_comment(id_treehistory_comment),
    id_volunteer integer REFERENCES volunteer(id_volunteer),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,

  `CREATE TABLE IF NOT EXISTS treedata (
    id_treedata SERIAL NOT NULL PRIMARY KEY,
    id_treehistory integer REFERENCES treehistory(id_treehistory),
    ref INTEGER,
    who VARCHAR(255),
    common VARCHAR(255),
    scientific VARCHAR(255),
    genus VARCHAR(255),
    lng FLOAT8,
    lat FLOAT8,
    planted TIMESTAMP,
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip VARCHAR(255),
    country VARCHAR(255),
    neighborhood VARCHAR(255),
    health VARCHAR(255),
    dbh VARCHAR(255),
    height VARCHAR(255),
    owner VARCHAR(255),
    url VARCHAR(255),
    urlimage VARCHAR(255),
    status VARCHAR(255),
    notes VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`,

];

const queried = queryStrings.map(queryString => {
  pool.query(queryString, (err,res) =>{
  if (err) {
    console.error(err);
    process.exit(-1);
  }
    console.log(res);
    
  });
})
pool.end();
console.log(queried);

// SELECT * FROM volunteer.columns
// WHERE table_schema = 'volunteer'
// AND TABLE_NAME = 'volunteer';

// SELECT * FROM trees.treedata WHERE schemaname == 'treedata';

// To check table was created
// psql trees
// \dt