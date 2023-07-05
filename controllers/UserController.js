const Middleware = require('../middleware/Auth');
const db = require('../models/Index');
const bcrypt = require('bcryptjs');

const login = async (req, res, next) => {

	try {

		const { email, password } = req.body;

		const userData = await db.User.findOne({ where: { email: email } });

		// Check if the user exists
		if (!userData) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		const storedHashedPassword = userData.password;

		// Compare the entered password with the stored hashed password
		bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
			if (err) {
				console.error('Error comparing passwords:', err);
				// Handle the error
				return res.status(401).json({ message: 'Invalid password' });
			}

			if (isMatch) {
				const token = Middleware.generateToken(userData);
				// Passwords match
				return res.status(200).json({
					status: "success",
					code: 200,
					message: "message from backend",
					results: {
						token: token
					}
				});
			} else {
				return res.status(401).json({ message: 'Error, password do not match' });
			}
		});
	} catch (error) {
		return res.status(500).json({
			message: error.message
		});
	}
};

module.exports = {
	login
}
