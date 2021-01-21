const mysql = require('mysql');

exports.db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'link_preview',
  multipleStatements: true,
});
