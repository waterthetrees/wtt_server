const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

/*
README
After running this script, check your rows for a confidence check.

(Please Update this accordingly if new sources are added.)

TODO: victoria not sure if these numbers are right because of the possible duplicates

> treedb=# select count(*) from treedata;
 count 
-------
  2253
(1 row)

> treedb=# select count(*) from treehistory;
 count 
-------
   739
(1 row)
*/

const insertRows = (pathToCsv, queryString, pool) => {
  const insertRow = (params, client) => {
    client.query(queryString, params, (err, res) => {
      if (err) {
        console.log("Error during row insertion: ", err.stack);
        console.log("Faulty row is ", params);
      } else {
        console.log(
          `Inserted row from ${pathToCsv}: ${params[0]}, ${params[1]} ${params[2]}`
        );
      }
    });
  };

  let csvData = [];
  const csvStream = fastcsv
    .parse({ quote: false })
    .on("data", (data) => {
      csvData.push(data);
    })
    .on("end", () => {
      // Remove the first line: header
      csvData.shift();

      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach((params) => {
            insertRow(params, client);
          });
        } finally {
          done();
        }
      });
    });

  fs.createReadStream(pathToCsv).pipe(csvStream);
};

const seedTreeData = (pool) => {
  const treeDataSources = ["oakland_trees_clean4.csv"];

  // Note that this query string is specific to the Oakland data from Sierra Club.
  const insertOaklandIntoTreeDataQueryString = `
  INSERT INTO treedata (
    ref, 
    who, 
    common, 
    scientific, 
    genus,
    lng, 
    lat, 
    planted, 
    address, 
    city,
    state, 
    zip, 
    country, 
    neighborhood, 
    health,
    dbh, 
    height, 
    owner, 
    url, 
    urlimage,
    status, 
    notes
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`;

  treeDataSources.forEach((sourcePath) =>
    insertRows(sourcePath, insertOaklandIntoTreeDataQueryString, pool)
  );
};

const seedTreeHistory = (pool) => {
  const treeHistorySources = [
    "oakland_trees_maintenance_2019.csv",
    "oakland_trees_maintenance_2020.csv",
  ];

  // Note that this query string is specific to the Oakland data from Sierra Club.
  const insertOaklandIntoTreeHistoryQueryString = `
  INSERT INTO treehistory(
    lng, 
    lat, 
    common, 
    datevisit, 
    volunteer, 
    watered, 
    staked,
    braced, 
    weeded, 
    mulched, 
    pruned, 
    comment, 
    id_tree
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
    (SELECT id_tree FROM treedata WHERE treedata.lng = $1 AND treedata.lat = $2) -- lng + lat is the unique key
  );`;

  treeHistorySources.forEach((sourcePath) =>
    insertRows(sourcePath, insertOaklandIntoTreeHistoryQueryString, pool)
  );
};

const main = () => {
  // Create a new connection to the database
  const pool = new Pool({
    connectionLimit: 10,
    database: "treedb",
    user: "trees",
    host: "localhost",
    password: "trees",
    port: 5432,
    dateStrings: "date",
  });

  seedTreeData(pool);
  seedTreeHistory(pool);

  pool.end();
};

main();
