const pgp = require('pg-promise')();

const config = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_NAME,
  // user: process.env.DB_USER,
  // password:   process.env.DB_PASS
};

module.exports = pgp(config);
