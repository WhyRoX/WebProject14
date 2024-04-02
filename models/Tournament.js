const db = require('../models/db_conf');


module.exports.list = () => {
    return db.prepare("SELECT * FROM tournaments").all();
};


module.exports.findById = (id) => {
    return db.prepare("SELECT * FROM tournaments WHERE tournaments_id = ?").get(id);
};


module.exports.save = (data) => {
    console.log("SAVE :" + JSON.stringify(data));
    //no id => add exoplanet
    if (data.id === undefined) {
        const stmt = db.prepare('INSERT INTO TOURNAMENTS(unique_name, hclass, discovery_year, image) VALUES (?, ?, ?, ?)');
        const info = stmt.run(data.uniqueName, data.hClass, data.discoveryYear, data.image);
        console.log("tournament model save" + info.changes);
    }
    // id => update exoplanet
    else {
        const stmt = db.prepare('UPDATE TOURNAMENT SET unique_name = ?, hclass = ?, discovery_year = ?, ist = ?, pclass = ? WHERE exoplanet_id = ?');
        const info = stmt.run(data.uniqueName, data.hClass, data.discoveryYear, data.IST, data.pClass, data.id);
        console.log("exoplanet model save update" + info.changes);

    }




};

    