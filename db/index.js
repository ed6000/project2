// Setup for pg promise
const pgp = require('pg-promise')();

// configuration object
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'movies'
};

const db = pgp(process.env.DATABASE_URL || cn); // cn is the configuration object

module.exports = db;