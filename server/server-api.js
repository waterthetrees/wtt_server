const http = require("http");
const https = require("https");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const parser = require("body-parser");
util = require("util");

const { getMap, getTree, postTree, getTreeHistory, postTreeHistory } = require("./controller.js");

// these are for various environments when we move to dev and live server vs local
const env = process.argv[2] || "local";
const host = {
  prod: "https://waterthetrees.com",
  dev: "https://dev.waterthetrees.com",
  local: "http://localhost",
}[env];
const port = { dev: 3441, prod: 3002, local: 3002 }[env];

//this is for whitelisting hosts for cors
const whitelist = [
  "http://localhost:3001",
  "http://localhost",
  "https://dev.waterthetrees.com",
  "https://waterthetrees.com",
  "https://www.waterthetrees.com",
];
var options = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
const router = express.Router();

//for logging on command line
app.use(morgan("dev"));
app.use(parser.json());
// Retrieve the raw body as a buffer and match all content types
app.use(require("body-parser").raw({ type: "*/*" }));
app.use(cors(options));

// ROUTES
app.use("/", router);

router.route("/api/tree")
  .get(getTree)
  .post(postTree)

router.route("/api/treemap")
  .get(getMap);

router.route("/api/treehistory")
  .get(getTreeHistory)
  .post(postTreeHistory);

const httpServer = http.createServer(app);
const server = httpServer.listen(port, () => console.log(`${host}:${port}`));

// TODO setup https/letsencrypt
// const httpsServer = https.createServer(options, app);
// const server = httpsServer.listen(port, () => logger.log('info', `${host}:${port}`));
