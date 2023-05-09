// server/middleware/get-db-conn.js

// Extract the relevant environment variables
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

// Construct the MySQL URL using the extracted variables
const mysqlUrl = `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;


import mysql from 'mysql2/promise';
const connection = mysql.createConnection(
  mysqlUrl + "?connectionLimit=1&debug=false"
);

export function createConnection(options) {
  return function (req, res, next) {
    if (req.conn) return next();
    req.conn = connection.catch((err) => {
      if (err)
        req.conn = mysql.createConnection(
          mysqlUrl + "?connectionLimit=1&debug=false"
        );
    });
    next();
  };
}
