# wtt_server
PSQL/node server
1. Install packages ` cd /wtt_server && yarn install`

create database 
1. `cd server/db; node create_db_trees.js`
2. create tables `node create_tables.js`
3. seed tables `node seed_table.js`, one for each csv



2. Run the server `node server/server-api.js local`


