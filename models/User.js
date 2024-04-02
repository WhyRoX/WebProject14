const db = require("./db_conf.js");

/* Creating a new user */
module.exports.save = (firstname, surname, email, password, status) => {
    const stmt = db.prepare("INSERT INTO users (firstname, surname, email, password, status) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(firstname, surname, email, password, status);
};

/* Getting encrypted password by email to login */
module.exports.login = (email) => {
    const stmt = db.prepare("SELECT password FROM users WHERE email = ?");
    const user = stmt.get(email);
    return user ? user.password : null;
};

/* Getting a user info by email */
module.exports.data = (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
};

