const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

db.serialize(() => {
    // Run sqlite in WAL mode
    db.run(`
        PRAGMA journal_mode=WAL;
    `)

    db.run(`
        create table if not exists users (
            id text primary key,
            name text,
            email text,
            createdAt datetime default current_timestamp,
            updatedAt datetime default current_timestamp
        )
    `, (err, row) => {
        console.log(row, err);
    });

    db.run(`
        create table if not exists smokes (
            id integer primary key autoincrement,
            userId text not null,
            createdAt datetime default current_timestamp
        )
    `, (err, row) => {
        console.log(row, err);
    });

});

export default db;