// bin/verify_user.js

console.log("Application starts ...");

//requires: mysql connection, username, email, password
//optional: access = ['user']

function verify(con, email, password) {
	if (!con || !email || !password) throw new Error('required parameter missing')
	//pull db entry for email
	const stmt = `SELECT email, hashedpw, salt, access FROM Users 
    	WHERE email = ? ;`

	const values = [email]
	//execute statement
	return new Promise((resolve, reject) => {
		con.execute(stmt, values, (err, results, fields) => {
			if (err) return reject(err)
			console.log(results)
			console.log(fields)
			resolve([results, fields])
			//find salt

			//hash given pw with salt
			//verify against stored pw
		})
	})

	/*
		//get salt
		const salt = crypto.randomBytes(8)
			.toString('base64'
			.slice(0,16)
		//hash pw
		const hash = crypto.createHmac('sha512', salt)
		hash.update(password)
		const hashedpw = hash.digest('base64')
		//construct statement
	*/
}

export default verify
