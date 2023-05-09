import util from 'util';
import aliasTable from './boot/alias-table.js';
import authentication from './boot/authentication.js';

export default async function boot(app) {
    const aliasTablePromise = util.promisify(aliasTable)
    const authenticationPromise = util.promisify(authentication)
    await aliasTablePromise(app)    
    await authenticationPromise(app)
}