const { forgotpassService } = require('../../service/login/forgot');
const getForgot = async (req, res) => {
	res.render('login/forgot');
};
const forgotPass = async (req, res) => {
	try {
		const user = await forgotpassService(req.body);

		if (user > 0) {
			if (req.body.new_pass == req.body.confirm_pass) {
				res.redirect(`/`);
			} else {
				const error_forgot = 'Password not matched';
				res.render('login/forgot', { error_forgot });
			}
		} else {
			const error_forgot = 'Invalid email';
			res.render('forgot', { error_forgot });
		}
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};
module.exports = { getForgot, forgotPass };
