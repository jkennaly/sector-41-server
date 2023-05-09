// bin/common/cachedMon.js

import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek.js'
dayjs.extend(isoWeek)
import _ from 'lodash'

const siteCache = {}
const siteCacheTime = {}

const mondayBetween = pastTime => {
	const pastMondayStartEpochy = dayjs()
		.isoWeekday(1)
		.hour(0)
		.minute(0)
		.second(0)
		.millisecond(0)
		.valueOf()
	const pastTimeEpochy = dayjs(pastTime).valueOf()
	return pastTimeEpochy < pastMondayStartEpochy
}

const cachedMon = (key, val) => {
	if(!val) {

		const time = _.get(siteCacheTime, key, 0)
		const cacheValid = time && !mondayBetween(time)
		if (cacheValid) return _.get(siteCache, key)
		return
	}
	_.set(siteCacheTime, key, Date.now())
	_.set(siteCache, key, val)
	return val
}

const cachedMid = (req, res, next) => {
	const path = req.path
	const query = JSON.stringify(req.query)
	const key = `${path}.${query}`
	const html = res.locals.html
	const cached = cachedMon(key, html)
	if(cached) return res.send(cached)
	return next()
}
export default cachedMid