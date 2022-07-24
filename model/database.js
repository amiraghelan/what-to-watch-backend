require("dotenv").config()
const mysql = require("mysql2");

const pool = mysql.createPool({
  database: "what-to-watch",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool.promise()