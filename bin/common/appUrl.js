// bin/common/appUrl.js

const subjectTypeRoute = {
	'2': 'artists',
	'7': 'fests'
}

const baseUrl = process.env.APP_BASE || 'https://festigram.app/'

const appUrl = so => {
	const url = `${baseUrl}#!/${subjectTypeRoute[so.subjectType]}/pregame/${so.subject}`
	return url
}

export default appUrl