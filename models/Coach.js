const db = require("./db_conf.js");

module.exports.info = () => {
    const stmt = db.prepare("SELECT * FROM users");
    return stmt.all();
}

module.exports.findById = (user_id) => {
    const stmt = db.prepare("SELECT * FROM users WHERE user_id = ?");
    return stmt.get(user_id);
};