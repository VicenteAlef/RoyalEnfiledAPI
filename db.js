const sql = require("sqlite3").verbose();
const db = new sql.Database("./motos.db");

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS motos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            price INTEGER NOT NULL,
            description TEXT,
            image_one_link TEXT NOT NULL,
            image_two_link TEXT,
            image_three_link
        )`
  );
});

module.exports = db;
