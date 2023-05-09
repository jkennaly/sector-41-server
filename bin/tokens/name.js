// bin/tokens/name.js

//generate the name claime based on the access field value

export function claimString(name, claimName='name') {
	const claimHolder = {}
	claimHolder[claimName] = name

	return claimHolder
}
