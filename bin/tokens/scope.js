// bin/tokens/scope.js

//generate the claim

const userScopes = 'openid profile email create:messages'
const adminScopes = 'admin create:festivals verify:festivals'
const scopesObject = {
	user: userScopes,
	admin: adminScopes
}
const allScopes = `${userScopes} ${adminScopes}`
export default function(requestedScopesString = allScopes, rolesStringified) {
	const claimHolder = {}
	const roles = JSON.parse(rolesStringified)
	const availableScopes = roles
		.map(role => scopesObject[role])
		.join(' ')
		.split(' ')
	const requestedScopes = requestedScopesString.split(' ')
	const claimScopes = requestedScopes
		.filter(rs => availableScopes.includes(rs))

	claimHolder.scope = claimScopes.join(' ')

	return claimHolder
}
