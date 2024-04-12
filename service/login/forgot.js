const { logError } = require('../../logs');
const logger = require('../../logs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const connection = require('../../config/connection');
const forgotPassService = async (req, res) => {
	try {
		console.log(req.body);
		bcrypt.hash(req.body.new_pass, saltRounds, async (err, hash) => {
			const sql0 = `update users set status=?,password=? where email=?`;
			var ans = await connection.execute(sql0, [6, hash, req.body.email]);
			if (!ans == 0) {
				res.status(201).send('You are successfully registerd');
			}
		});
	} catch (error) {
		logger.logError(error);
		throw error;
	}
};
module.exports = { forgotPassService };
