// bin/add_user.js

import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
//requires: mysql connection, username, email, password
//optional: access = ['user']

async function addUser(con, username, email, password, access = ['user']) {
	if (!con || !username || !email || !password) throw new Error('required parameter missing')
	//get salt
	const conn = con.promise()
	const salt = crypto.randomBytes(8)
		.toString('base64') /** convert to hexadecimal format */
		.slice(0, 16)
	//hash pw
	const hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
	hash.update(password)
	const hashedpw = hash.digest('base64')
	const id = uuidv4()
	const stmt = `INSERT INTO Users (username, email, hashedpw, salt, access, mobile_auth_key) 
	    	VALUES (?, ?, ?, ?, ?, ?);`

	const values = [username, email, hashedpw, salt, access, id]
	await conn.execute(stmt, values)
	const stmt2 = `INSERT INTO user_aliases (user, alias) SELECT id, ? FROM Users;`
	const values2 = [`fest|${id}`]
	await conn.execute(stmt2, values2)
	return { username, email, access, id: mobile_auth_key }
}

export default addUser
