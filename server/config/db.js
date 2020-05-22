const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "nandigwd46",
    host : "localhost",
    port : 5432,
    database : "postgres"
});

module.exports = pool; 