const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Kết nối cơ sở dữ liệu thất bại:', err);
    return;
  }
  console.log('Kết nối cơ sở dữ liệu thành công!');
  connection.release();
});

module.exports = pool.promise();