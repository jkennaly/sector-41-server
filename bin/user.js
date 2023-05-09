// bin/update_user.js

import crypto from 'crypto'
//requires: mysql connection, username, email, password
//optional: access = ['user']

const hash = password => {
    const salt = crypto.randomBytes(8)
        .toString('base64') /** convert to hexadecimal format */
        .slice(0, 16)
    //hash pw
    const hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
    hash.update(password)
    const hashedpw = hash.digest('base64')
    return { salt, hashedpw }
}

export async function updateUser(con, idOrEmail, { password, id, email, salt, ...updates }) {
    if (!con || !idOrEmail) throw new Error('required parameter missing')
    try {
        const conn = con.promise()
        const hashed = password ? hash(password) : {}
        const pairs = Object.assign({}, updates, hashed)
        const pairEntries = Object.entries(pairs)
        if (!pairEntries.length) throw new Error('no updates provided')
        const setValues = pairEntries.map(([key]) => `${key} = ?`).join(', ')
        const stmt = `UPDATE Users SET ${setValues} WHERE ${typeof idOrEmail === 'string' ? 'email' : 'id'} = ?;`
        const values = pairEntries.map(([k, v]) => v).concat([idOrEmail])
        const res = await conn.execute(stmt, values)
        return res
    } catch (e) {
        console.log(e)
        throw e
    }
}
