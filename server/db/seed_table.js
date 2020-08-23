const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("oakland_trees_clean.csv");
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



    console.log(csvData[0]);

    const query =
      `INSERT INTO treedata (ref, who, common, scientific, genus, 
          lng, lat, planted, address, city, 
          state, zip, country, neighborhood, health, 
          dbh, height, owner, url, urlimage, 
          status, notes) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
    $17, $18, $19, $20, $21, $22)`;

    // let query = `INSERT INTO treedata (ref, who, common, scientific, genus, 
    //       lng, lat, planted, address, city, 
    //       state, zip, country, neighborhood, health, 
    //       dbh, height, owner, url, urlimage, 
    //       status, notes) 
    //     VALUES (${ref}, ${who}, ${common}, ${scientific}, ${genus}, ${
    //       lng}, ${lat}, ${planted}, ${address}, ${city}, ${
    //       state}, ${zip}, ${country}, ${neighborhood}, ${health}, ${
    //       dbh}, ${height}, ${owner}, ${url}, ${urlimage}, ${
    //       status}, ${notes})`;
    // console.log('query',query);

    pool.connect((err, client, done) => {
      if (err) throw err;

      try {
        csvData.forEach(row => {
          // console.log('row', row);
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