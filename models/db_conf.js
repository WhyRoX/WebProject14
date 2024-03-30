const db = require("better-sqlite3")("./models/vinci-court.db", { verbose: console.log });

module.exports = db;