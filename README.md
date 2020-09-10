# wtt_server

PSQL/node server

## Getting started for the first time

1. Install packages.

```
cd /wtt_server
yarn install
```

2. Install and start Postgres.

```
brew install postgres
brew services start postgresql
psql -d postgres -U <your_sudo_username>
```

Later, you can stop Postgres with `brew services start postgresql`.

3. Load database.

- Create database: `node create_db_trees.js local`. NOTE: This script isn't working yet; please open the file and follow the manual instructions.
- Create tables: `node server/db/tables_create.js local`
- Seed tables: `node server/db/tables_seed.js local`

4. Run the server: `node server/server-api.js local`

## Getting back into it

```
brew services start postgresql
node server/server-api.js local
```


## Run `sudo apt-get install -y nodejs` to install Node.js 14.x and npm
## You may also need development tools to build native addons:
     sudo apt-get install gcc g++ make
## To install the Yarn package manager, run:
     curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
     echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
     sudo apt-get update && sudo apt-get install yarn