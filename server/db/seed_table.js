const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
// const crypto = require('crypto');
const { logger } = require("../../logger.js");

async function iterateOverCsvFiles() {
  const functionName = 'iterateOverCsvFiles';
  const csvFilesArray = [
    // {tableName: 'treedata', csvFileName: 'oakland_trees_clean4.csv'},
    // {tableName: 'treehistory', csvFileName: 'oakland_trees_maintenance_2019.csv'},
    {tableName: 'treehistory', csvFileName: 'oakland_trees_maintenance_2020.csv'}
  ];
  try {
    for (const csvFileObj of csvFilesArray) {
      await seedData(csvFileObj.csvFileName, csvFileObj.tableName);
      await util.promisify(setTimeout)(5000);
    }
    return;
  } catch(err) {
    logger.error(`${functionName} CATCH ${err}`)
  }
}

function seedData(csvFile, queryName) {

  let stream = fs.createReadStream(csvFile);
  let csvData = [];
  let csvStream = fastcsv
  .parse({ quote: false })
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    // create a new connection to the database
    const pool = new Pool({
      connectionLimit: 10,
      database: 'treedb', 
      user: 'trees',
      host: 'localhost',
      password: 'trees',
      port: 5432,
      dateStrings: 'date'
    });

    const queryTreeData =
            `INSERT INTO treedata (ref, who, common, scientific, genus, 
                lng, lat, planted, address, city, 
                state, zip, country, neighborhood, health, 
                dbh, height, owner, url, urlimage, 
                status, notes) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
          $17, $18, $19, $20, $21, $22)`;

  
    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          console.log('row', row);
          // const uuid_tree = uuidv4();
          const queryTreeHistory = `INSERT INTO treehistory(lng, lat, common, datevisit, volunteer, watered, staked, braced, weeded, mulched, pruned, comment, id_tree)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
                    (SELECT id_tree FROM treedata 
                    WHERE 
                    treedata.lng = ${row[0]}
                    AND treedata.lat = ${row[1]}));`

          const query = (queryName === 'treehistory') ? queryTreeHistory : queryTreeData;
          client.query(query, row, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              console.log("inserted " + res.rowCount + " row:", row);
            }
          });
        });
      } finally {
        done();
      }
    });
  });

  stream.pipe(csvStream);
}
iterateOverCsvFiles();

// function uuidv4() {
//   return 'treexxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }

// function uuidv4() {
//   return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
//     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//   );
// }