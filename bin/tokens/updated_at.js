// bin/tokens/updated_at.js

//generate the updated_at claime based on the access field value
//assumes timestamp is in ISO format with seconds but no ms
//regex for ISO format from https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime

export default function(timestamp) {
	const formatOk = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/.test(timestamp)
	if(!formatOk) throw new Error(`Invalid ISO 8601 format ${timestamp}`)
	const claimName = `updated_at`
	const claimHolder = {}
	claimHolder[claimName] = timestamp

	return claimHolder
}
