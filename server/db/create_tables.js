// Schema created by Wes Warren, Ajay Anand, Victoria Tan, Rose Meyers, Steve

const env = process.argv[2] || "dev";
// We are using pg-native for this script only, in order to create the tables synchronously
const Client = require("pg-native");

/*
  README:
  After running this script, check that the table was created.
  `psql trees`
  `\dt`

  Other helpful snippets for v2 (not useful now):
  SELECT * FROM volunteer.columns
  WHERE table_schema = 'volunteer'
  AND TABLE_NAME = 'volunteer';

  SELECT * FROM trees.treedata WHERE schemaname == 'treedata';
 */

const config = {
  local: {
    connectionLimit: 10,
    database: "treedb",
    user: "trees",
    host: "localhost",
    password: "trees",
    port: 5432,
    dateStrings: "date",
  },
}[env];

const QUERIES = [
  // `CREATE TABLE IF NOT EXISTS volunteers(
  //   id_volunteer SERIAL NOT NULL PRIMARY KEY,
  //   name VARCHAR(255),
  //   email VARCHAR(255),
  //   zipcode VARCHAR(255),
  //   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  // );`,

  // `CREATE TABLE IF NOT EXISTS treehistory_comment(
  //   id_treehistory_comment SERIAL NOT NULL PRIMARY KEY,
  //   treeaction_comment VARCHAR(255),
  //   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  // );`,

  // `CREATE TABLE IF NOT EXISTS treehistory_action(
  //   id_treehistory_action SERIAL NOT NULL PRIMARY KEY,
  //   treehistory_action_name VARCHAR(255),
  //   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  // );`,

  // `CREATE TABLE IF NOT EXISTS treehistory(
  //   id_treehistory SERIAL NOT NULL PRIMARY KEY,
  //   id_treehistory_action integer REFERENCES treehistory_action(id_treehistory_action),
  //   id_treehistory_comment integer REFERENCES treehistory_comment(id_treehistory_comment),
  //   id_volunteer integer REFERENCES volunteers(id_volunteer),
  //   createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  // );`,
  {
    description: "Creating treedata table",
    apply: true,
    queryString: `CREATE TABLE IF NOT EXISTS treedata (
    id_tree INT GENERATED ALWAYS AS IDENTITY,
    uuid_tree UUID NOT NULL DEFAULT uuid_generate_v4(),
    ref VARCHAR(255),
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
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id_tree),
    UNIQUE (who, ref, lng, lat) -- TODO: victoria: there seem to be actual duplicates that violate this constraint. is this constraint false?
  );`,
  },
  {
    description: "Creating treehistory table",
    apply: true,
    queryString: `CREATE TABLE IF NOT EXISTS treehistory(
    id_treehistory INT GENERATED ALWAYS AS IDENTITY,
    id_tree integer,
    watered VARCHAR(255),
    mulched VARCHAR(255),
    pruned VARCHAR(255),
    staked VARCHAR(255),
    braced VARCHAR(255),
    weeded VARCHAR(255),
    comment TEXT,
    volunteer VARCHAR(255),
    date_visit TIMESTAMP, -- equal to created_at for non-seed entries
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- For manual debugging use only
    PRIMARY KEY(id_treehistory),
    CONSTRAINT fk_treedata FOREIGN KEY(id_tree) REFERENCES treedata(id_tree)
  );`,
  },
];

const main = () => {
  const client = new Client();
  try {
    client.connectSync(
      "dbname=treedb user=trees host=localhost password=trees port=5432 connect_timeout=10"
    );
  } catch (err) {
    throw err;
  }

  console.log("Creating all tables...");
  QUERIES.filter((query) => query.apply).forEach((query) => {
    console.log(query.description);
    try {
      client.querySync(query.queryString);
    } catch (err) {
      console.error("Error: ", err);
    }
  });
  console.log("Done creating tables.");
};

main();
