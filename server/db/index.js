const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'nenozidic',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'test',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
