const db = require("better-sqlite3")("./models/...", { verbose: console.log });

module.exports = db;