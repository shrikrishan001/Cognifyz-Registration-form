const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Absolute path to database
const dbPath = path.join(__dirname, "database", "users.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ SQLite Error:", err.message);
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

            district TEXT,

            postoffice TEXT,

            address TEXT,

            password TEXT,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP

        )
    `, (err) => {
        if (err) {
            console.error("❌ Table Creation Error:", err.message);
        } else {
            console.log("✅ Users table ready");
        }
    });
});

module.exports = db;