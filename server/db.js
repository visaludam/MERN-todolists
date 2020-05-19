const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "udamv5al",
    host: "localhost",
    port : 5432,
    database: "mytodo"
});

module.exports = pool;