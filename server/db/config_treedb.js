const env = process.argv[2] || 'local';

const configTreeDB = {
  local: {
    database: "treedb",
    user: "trees",
    host: "localhost",
    password: "trees",
    port: 5432,
  },
}[env];


module.exports = configTreeDB;