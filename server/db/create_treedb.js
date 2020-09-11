const env = process.argv[2] || "dev";
const util = require("util");
const pgtools = require("pgtools");

/*
  README:

  This script is currently not working, so we're intentionally not running `main()`. Instead, run the commands manually.

  1. Open postgres: `psql -d postgres -U <your_sudo_user>`
  2. Create the db in postgres:
   > CREATE DATABASE "treedb";
   > CREATE USER trees WITH ENCRYPTED PASSWORD 'trees';
   > GRANT ALL PRIVILEGES ON DATABASE "treedb" TO trees;
   > ALTER USER trees CREATEDB;
  3. Check that your db exists: `psql treedb` => should pull a prompt that looks like `treedb=# `
  4. Add the UUID extension to the treedb:
   > CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  
  That's it!

  ***

  Other helpful snippets for v2 (not useful now):
  SELECT * FROM volunteer.columns
  WHERE table_schema = 'volunteer'
  AND TABLE_NAME = 'volunteer';

  SELECT * FROM trees.treedata WHERE schemaname == 'treedata';
 */

const config = {
  local: {
    database: "treedb",
    user: "trees",
    host: "localhost",
    password: "trees",
    port: 5432,
  },
}[env];

// TODO: victoria: these were the commands I ended up running manually; we should convert these to an actual script
const createDbQuery = `CREATE DATABASE "${config.database}";`; // CREATE DATABASE "treedb";
const createUserQuery = `CREATE USER ${config.user} WITH ENCRYPTED PASSWORD '${config.password}';`; // CREATE USER trees WITH ENCRYPTED PASSWORD 'trees';
const grantPermissionsQuery = `GRANT ALL PRIVILEGES ON DATABASE "${config.database}" TO ${config.user};`; // GRANT ALL PRIVILEGES ON DATABASE "treedb" TO trees;
const grantCreateDbPermissionsQuery = `ALTER USER ${config.user} CREATEDB;`; // ALTER USER trees CREATEDB;
const uuidQuery = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`; // CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

const main = () => {
  // TODO: victoria: this is the original code; it did not seems to work so we should debug this later
  pgtools.createdb(config, config.database, (err, res) => {
    if (err) {
      console.error("Error while creating db: ", err);
      process.exit(-1);
    }
    console.log("Response: ", res);
  });
};
