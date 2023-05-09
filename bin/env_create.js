// bin/env_create.js

import fs from "fs"
import crypto from 'crypto'
//requires: mysql connection config object
//optional: access = ['user']

//  mysql://root:password@localhost:port/dbName

function envCreate (dbconfig) {
	const connString = `mysql://${dbconfig.username}:${dbconfig.password}@${dbconfig.host}:${dbconfig.port}/${dbconfig.database}`
	const connLimit = 2
	const nodeEnv = `test`
	const secret = crypto.randomBytes(64).toString('base64')
	const gt = crypto.randomBytes(64).toString('base64')
	const env = 
`# .env
JAWSDB_URL=${connString}
# DEBUG=loopback:connector:mysql
CONN_LIMIT=${connLimit}
NODE_ENV=${nodeEnv}
LOCAL_SECRET=${secret}
GT_ACCESS_SECRET=${gt}
DATE_CAP=3
FEST_CAP=5
FULL_CAP=10
`
	//if there is already an env file, rename it to .envlocal
	if(fs.existsSync('../.env')) fs.renameSync('../.envlocal')
	fs.writeFile('../.env', env)

}

export default envCreate
