const db = require("./db_conf.js");

module.exports.info = () => {
    const stmt = db.prepare("SELECT * FROM courts");
    return stmt.all();
}

module.exports.findById = (court_id) => {
    const stmt = db.prepare("SELECT * FROM courts WHERE id = ?");
    return stmt.get(court_id);
};


module.exports.update = (court_id, name, flooring_type, location, court_image) => {
    const stmt = db.prepare("UPDATE courts SET name = ?, flooring_type = ?, location = ?, court_image = ? WHERE court_id = ?");
    stmt.run(name, flooring_type, location, court_image, court_id);
}

