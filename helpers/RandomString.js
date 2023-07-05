const crypto = require('crypto');

function generateTokenKey() {
	const tokenKey = crypto.randomBytes(64).toString('hex');
	return tokenKey;
}

const secureTokenKey = generateTokenKey();
console.log('Secure Token Key:', secureTokenKey);
