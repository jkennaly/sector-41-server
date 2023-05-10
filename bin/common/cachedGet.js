// bin/common/cachedGet.js
import { DateTime } from 'luxon';
import _ from 'lodash'
import axios from 'axios'

const siteCache = {}
const siteCacheTime = {}

const mondayBetween = pastTime => {
	const pastMondayStartEpochy = DateTime.local()
	  .startOf('week')
	  .plus({ days: 1 })
	  .startOf('day')
	  .toMillis();
	const pastTimeEpochy = DateTime.fromISO(pastTime).toMillis();
	return pastTimeEpochy < pastMondayStartEpochy;
  };

const cachedGet = async (url, opt) => {
	const key = `${url}.${JSON.stringify(opt)}`
	const time = _.get(siteCacheTime, key, 0)
	const cacheValid = time && !mondayBetween(time)
	if (cacheValid) return _.get(siteCache, key)
	const res = await axios.get(url, opt);
	_.set(siteCache, key, res);
	_.set(siteCacheTime, key, Date.now());
	return res;
}

export default cachedGet