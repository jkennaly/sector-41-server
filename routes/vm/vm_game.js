// server/views/vm/vm-festival.js

import fs from 'fs';
import cachedGet from '../../bin/common/cachedGet.js';

import _ from 'lodash';
export default async (opt) => {
	try {
	const games = await cachedGet(
		`/api/games`,
		{ baseURL: opt.baseUrl }
	)
	console.log('vm_game games', games)
	return games
	} catch (err) {
		throw err
	}
	
}
