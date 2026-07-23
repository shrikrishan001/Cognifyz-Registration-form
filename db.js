const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/users.db", (err) => {

    if (err) {
        console.error("❌ Error:", err.message);
    } else {
        console.log("✅ SQLite Connected Successfully");
    }

});

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            fullname TEXT NOT NULL,

            email TEXT UNIQUE NOT NULL,

            phone TEXT,

            dob TEXT,

            gender TEXT,

            country TEXT,

            state TEXT,

            city TEXT,

            district TEXT,

            address TEXT,

            password TEXT,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `);

});

module.exports = db;