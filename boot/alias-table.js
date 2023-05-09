// server/boot/alias-table.js

import mysql from 'mysql2';
import _ from 'lodash';


// Extract the relevant environment variables
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

// Construct the MySQL URL using the extracted variables
const mysqlUrl = `mysql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
export default function aliasTable(app, callback) {
  
    const connection = mysql.createConnection(mysqlUrl + '?connectionLimit=1&debug=false');
    connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  //console.log('connected as id ' + connection.threadId + ' at ' + req.originalUrl);
})
    connection.execute(
      'SELECT * FROM `user_aliases`',
      [],
      (err, results, fields) => {
        if(err) return callback(err)
        var aliasTable = {}
      	const resultPairs = results.map(r => [r.alias, r.user])
     	_.assign(aliasTable, _.fromPairs(resultPairs))
     	app.set('aliasTable', aliasTable)
      	callback()
      }
    )
    connection.end()
};
