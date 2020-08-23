const env = process.argv[2] || 'dev';
const util = require('util');
const pgtools = require("pgtools");

const config = {
  local: {
    database: 'treetons', 
    user: 'user_name',
    host: 'localhost',
    password: 'password',
    port: 5432,
  }
}[env];

// const create_user_query = `CREATE USER '${config[env].username}'@'${config[env].host}' IDENTIFIED BY '${config[env].password}'`;
// const grant_permissions_query = `GRANT ALL PRIVILEGES ON *.* TO '${config[env].username}'@'${config[env].host}'`;

pgtools.createdb(config, config.database, function(err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});


// To CHECK that the database has been created 
// psql trees
// \l