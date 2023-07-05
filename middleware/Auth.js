require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware to generate a token
function generateToken(user) {
	// Generate a token
	const token = jwt.sign({ user_id: user.id }, process.env.TOKEN_KEY, { expiresIn: '2h' });
	return token;
}

// Middleware to check token manually
function checkToken(token) {

	if (!token || !token.startsWith('Bearer ')) {
		return { message: 'Invalid token when check token' };
	}

	const formattedToken = token.split(' ')[1];

	if (!formattedToken) {
		return { message: "A token is required for authentication" }
	}

	try {
		const decoded = jwt.verify(formattedToken, process.env.TOKEN_KEY);
		// Check token expiration
		const currentTimestamp = Math.floor(Date.now() / 1000); // Get current timestamp in seconds

		if (decoded.exp < currentTimestamp) {
			throw new Error('Token has expired');
		}
		decoded.message = 'Token is valid';
		return decoded;
	} catch (err) {
		if (err.name === 'TokenExpiredError') {
			throw new Error('Token has expired');
		} else {
			return { message: "Invalid token" }
		}
	}
}

module.exports = {
	generateToken,
	checkToken
};
