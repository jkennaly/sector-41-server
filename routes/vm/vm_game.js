// server/views/vm/vm-festival.js

import fs from 'fs';
import cachedGet from '../../bin/common/cachedGet.js';

import _ from 'lodash';
export default async (opt) => {
	try {
	const games = await cachedGet(
		`/api/Games`,
		{ baseURL: opt.baseUrl }
	)
	return { games}
	} catch (err) {
		throw err
	}
	
}
