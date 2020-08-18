const mysql = require('mysql');

const config = {
  host: 'localhost',
  pasword: '',
  user: 'localhost',
  database: 'test'
}

const pool = mysql.createPool(config);


module.exports = { pool: pool }