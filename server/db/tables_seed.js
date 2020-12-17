const fs = require('fs');
// We are using pg-native for this script only, in order to seed the table synchronously
const Client = require('pg-native');
const path = require('path');

const pathToSeedData = path.resolve(__dirname);
const { configPgNative } = require('./config_treedb.js');

/*
README
After running this script, check your rows for a confidence check.

(Please update this accordingly if new sources are added.)

TODO: victoria not sure if these numbers are right because of the possible duplicates

>treedb=# select count(*) from treedata;
 count
-------
  2277
(1 row)

>treedb=# select count(*) from treehistory;
 count
-------
   907
(1 row)
*/

const insertRows = (
  pathToCsv,
  queryString,
  client,
  expectedNumParams,
  modifyRow,
) => {
  const csvData = [];
  fs.readFileSync(pathToCsv)
    .toString()
    .split('\n')
    .forEach((row) => {
      const params = row.toString().replace('\r', '').split(',');

      modifyRow(params);

      /*
        Some comments in the csv contain commas. This leads to errors such as the following:

        [ From oakland_trees_maintenance_2019.csv ]
        Error: ERROR:  bind message supplies 13 parameters, but prepared statement "" requires 12
        Faulty row is  [
          '-122.188109',
          '37.764347',
          'Autumn Blaze maple',
          '2019-07-15 11:00:00',
          'WB',
          'yes',
          'yes',
          'yes',
          'no',
          'no',
          'yes',
          '"Plants',
          ' owners mulched"'
        ]

        Since the comment field is last, we can safely assume all the columns past
        the expected number of parameters are just part of the original comment.
        We can append these together to reconstruct the full original comment.
      */
      if (params.length > expectedNumParams) {
        const commentArray = [];
        for (let i = expectedNumParams - 1; i < params.length; i++) {
          commentArray.push(params[i]);
        }
        params.length = expectedNumParams;
        params[expectedNumParams - 1] = commentArray.join(',');
      }

      csvData.push(params);
    });

  // Remove header
  csvData.shift();

  // Insert rows
  csvData.forEach((params) => {
    try {
      client.querySync(queryString, params);
      console.log(
        `Inserted row from ${pathToCsv}: ${params[0]}, ${params[1]} ${params[2]}`,
      );
    } catch (err) {
      console.log(`Error during row insertion for ${pathToCsv}: `, err.stack);
      console.log('Faulty row is ', params);
    }
  });
};

const seedTreeData = (client) => {
  const treeDataSources = [`${pathToSeedData}/Alameda_street_trees_clean_min.csv`];

  // Note that this query string is specific to the Oakland data from Sierra Club.
  const insertCSVIntoTreeDataQueryString = `
  INSERT INTO treedata (
    id_reference, 
    who,
    address,
    city,
    state, 
    zip,
    country,
    neighborhood, 
    common, 
    scientific,
    lng, 
    lat,   
    dbh,
    height,
    health,
    owner, 
    url, 
    urlimage,
    planting_opt1,
    planting_opt1_com,
    planting_opt2,
    planting_opt3,
    side_type,
    location_tree_count,
    email
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)`;

  treeDataSources.forEach((sourcePath) => {
    console.log('source', sourcePath);
    insertRows(
      sourcePath,
      insertCSVIntoTreeDataQueryString,
      client,
      25,
      () => {},
    );
  });
};

// const seedTreeHistory = (client) => {
//   const treeHistorySources = [
//     `${pathToSeedData}/oakland_trees_maintenance_2019.csv`,
//     `${pathToSeedData}/oakland_trees_maintenance_2020.csv`,
//   ];

//   // Note that this query string is specific to the Oakland data from Sierra Club.
//   const insertOaklandIntoTreeHistoryQueryString = `
//   INSERT INTO treehistory(
//     date_visit,
//     volunteer,
//     watered,
//     staked,
//     braced,
//     weeded,
//     mulched,
//     pruned,
//     comment,
//     id_tree
//   )
//   VALUES ($3, $4, $5, $6, $7, $8, $9, $10, $11,
//     (SELECT treedata.id_tree FROM treedata WHERE treedata.lng = $1 AND treedata.lat = $2 LIMIT 1) -- lng + lat is the unique key
//   );`;

//   treeHistorySources.forEach((sourcePath) => {
//     console.log('source', sourcePath);

//     const modifyRows = (params) => {
//       // Remove the unused common_name param; psql doesn't like it
//       params.splice(2, 1);
//     };

//     insertRows(
//       sourcePath,
//       insertOaklandIntoTreeHistoryQueryString,
//       client,
//       11,
//       modifyRows,
//     );
//   });
// };

const main = () => {
  const client = new Client();
  try {
    client.connectSync(configPgNative);
  } catch (err) {
    throw err;
  }

  seedTreeData(client);
  // seedTreeHistory(client);
};

main();
