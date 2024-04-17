const { Strategy } = require('passport-jwt');
const connection = require('../config/connection');
const { SECRET_KEY } = process.env;
const logger = require('../logs');

var cookieExtractor = function(req) {
	return req.cookies?.token;
};


const auth = (passport) => {
	const options = {};
	options.jwtFromRequest = cookieExtractor;
	options.secretOrKey = SECRET_KEY;
	passport.use(
		new Strategy(options, async (payload, done) => {
			try {
				const [result] = await connection.execute(
					'select * from users where id=?',
					[payload.id]
				);
				if (result.length > 0) {
					return done(null, {
						id: result[0].id,
					});
				}
				return done(null, false);
			} catch (error) {
				logger.logError(error);
			}
		})
	);
};



module.exports = { auth,cookieExtractor };
