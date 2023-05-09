// bin/tokens/roles.js

//generate the roles claime based on the access field value

export default function (access) {
	const claimName = `https://festigram.app/roles`
	const claimHolder = {}
	try {
		claimHolder[claimName] = JSON.parse(access)
	} catch (e) {
		console.error(e)
		console.log('error parsing access field', access)
		claimHolder[claimName] = []
	}

	return claimHolder
}
