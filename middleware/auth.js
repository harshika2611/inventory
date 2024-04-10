const { Strategy, ExtractJwt } = require('passport-jwt');
const connection = require('../config/connection');
const { SECRET_KEY } = process.env;

const cookieExtractor = function (req) {
	if (req && req.cookies) {
		var token = req.cookies?.token;
	}
	return token;
};

const auth = (passport) => {
	const options = {};
	options.jwtFromRequest = cookieExtractor;
	options.secretOrKey = SECRET_KEY;
	passport.use(
		new Strategy(options, async (payload, done) => {
			try {
				const [result] = await connection.execute(
					'select * from users where email=?',
					[payload.email]
				);
				if (result.length > 0) {
					return done(null, {
						email: result[0].email,
					});
				}
				return done(null, false);
			} catch (error) {
				logger.logError('error', error);
				res.status(500).json({ message: 'can`t fetch result' });
			}
		})
	);
};

module.exports = { auth };
