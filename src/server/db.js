// server/db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('candidates.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS candidates (
      id INTEGER PRIMARY KEY,
      name TEXT,
      dob TEXT,
      address TEXT,
      contact TEXT,
      gender TEXT
    )
  `);
});

module.exports = db;
