// server/views/vm/vm-list.js

import fs from 'fs';
import cachedGet from '../../bin/common/cachedGet.js';

import _ from 'lodash';
const list = opt => cachedGet(opt.url, { baseURL: opt.baseUrl })
	.then(x => x.data)
	.then(series => series.filter(x => !x.deleted))
	.then(series => series.sort((a,b) => a.name && b.name && a.name.localeCompare(b.name)))
			
		
export default list