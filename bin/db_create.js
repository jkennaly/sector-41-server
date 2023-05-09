// bin/db_create.js

console.log("Application starts ...")
import mysql from 'mysql2'
import fs from 'fs'
import rl from 'readline'
import addUser from './add_user'
import createEnv from './env_create'
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
})

const qp = question => new Promise((resolve, reject) => {readline.question(question, response => resolve(response))})

var username, password, dbname
qp(`Username to access the database [festigram]`)
	.then(name => {
		username = name ? name : 'festigram'
		return qp(`password for database user [festigram]`)
	})
	.then(pw => {
		password = pw ? pw : 'festigram'
		return qp(`database name [festigram]`)
	})
	.then(db => {
		dbname = db ? db : 'festigram'
		var dbconfig = {
		  host: "localhost",
		  user: username,
		  password: password,
		  database: dbname,
		  multipleStatements: true,
		  connectionLimit: 2,
		  port: 3306
		}
		createEnv(dbconfig)

		fs.readFile(__dirname + '/init/fest.sql', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    const query = data.toString();

		var con = mysql.createConnection(dbconfig);
		con.connect(function(err) {
		  console.log("[fill database in MySql] - block BEGIN ");  
		  if (err) throw err;
		  varId = 6;
		  con.query(query, function (err, result, fields) {
		    if (err) throw err;
		  	// console.log(result);
		  	// create an admin user
		  	var admin, adminpw, adminemail
		  	qp(`Username for app administrator [festigram]`)
				.then(n => {
					admin = n ? n : 'festigram'
					return qp(`email for app administrator [festigram@localhost]`)
				})
				.then(e => {
					adminemail = e ? e : 'festigram@localhost'
					return qp(`password for app administrator [festigram]`)
				})
				.then(apw => {
					adminpw = apw ? apw : 'festigram'
		  			addUser(con, admin, adminemail, adminpw, ['admin', 'user'])
		  			con.end();
				})
				.then(res => {

					readline.close()
					con.end()

				})
				.catch(err => console.error(err))
		  });
		  console.log("[fill database in MySql] - block END");




		   
		 
})
		});
			console.log("END of the application.");
	})
 

	/*
 
 */