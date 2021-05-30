const Pool = require('pg').Pool;
require('dotenv').config();

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const prodConfig = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production'
      ? 'postgres://ocubhwxxnfyvnb:94d03711812a76f7fc6bca29a2a745f8f165b18aef36b15a6be7666d9d346e6a@ec2-3-233-7-12.compute-1.amazonaws.com:5432/da9ha84r8kg35p'
      : devConfig,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
