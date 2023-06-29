const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models/Index');

if (!process.env.TOKEN_KEY) {
	throw new Error('TOKEN_KEY must be set in the environment variables');
}

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_KEY;

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
	try {
		const user = await db.User.findByPk(jwt_payload.user_id);
		if (user) {
			return done(null, user);
		} else {
			return done(null, false, { message: "User not found" });
		}
	} catch (e) {
		return done(e, false, { message: "Token has expired" });
	}
});

passport.use(strategy);

function jwtAuthMiddleware() {
	return function (req, res, next) {
		passport.authenticate('jwt', { session: false }, (err, user, info) => {
			if (err) {
				return res.status(500).json({
					status: "erorr",
					code: 500,
					message: "Authentication process error",
					error: err
				});
			}
			if (!user) {
				return res.status(401).json({
					status: "erorr",
					code: 401,
					message: info.message || "User not found"
				});
			}
			req.user = user;
			next();
		})(req, res, next);
	};
}

module.exports = {
	jwtAuthMiddleware: jwtAuthMiddleware
};
