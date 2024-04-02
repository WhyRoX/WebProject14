const db = require("./db_conf.js");

module.exports.save = (firstname, surname, email, password, status) => {
    const stmt = db.prepare("INSERT INTO users (firstname, surname, email, password, status) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(firstname, surname, email, password, status);
};
