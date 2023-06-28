const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models/Index');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_KEY;

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
	try {
		const user = await db.User.findByPk(jwt_payload.user_id);
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	} catch (e) {
		return done(e, false);
	}
});

passport.use(strategy);