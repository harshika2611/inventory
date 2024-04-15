const {
	registerService,
	userService,
	checkUserService,
	userLoginService,
	logsService,
	logUnsuccessService,
	expireService,
} = require('../../service/login/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logger = require('../../logs');

const { SECRET_KEY } = process.env;

const getLogin = async (req, res) => {
	res.render('login/login');
};
const userLogin = async (req, res) => {
	try {
		const user = await userLoginService(req.body);
		if (user.length > 0 && user[0].status == 6) {
			bcrypt.compare(req.body.password, user[0].password, (err, results) => {
				if (err) {
					console.log('compare error', err);
					return;
				}
				const test = user[0].created_at;
				const expireDatePass = new Date(
					new Date(test).getTime() + 240 * 3600000
				).toDateString();
				const newDatePass = new Date().toDateString();
				if (user[0].role_id == 4) {
					if (results && newDatePass < expireDatePass) {
						const userId = user[0].id;
						const roleId = user[0].role_id;
						const token = jwt.sign({ id: userId, roleId: roleId }, SECRET_KEY, {
							expiresIn: '2h',
						});
						const id = user[0].id;
						// const logs = await logsService(id);
						return res.cookie('token', token).redirect(`/dashboard`);
					} else {
						// const id = user[0].id;
						//const log = await logUnsuccessService(id);
						const error = 'invalid email or password';
						res.render('login/login', { error });
					}
				} else if (user.length > 0 && user[0].role_id == 5) {
					if (results && newDatePass < expireDatePass) {
						const userId = user[0].id;
						const roleId = user[0].role_id;
						const token = jwt.sign({ id: userId, roleId: roleId }, SECRET_KEY, {
							expiresIn: '2h',
						});
						return res.cookie('token', token).redirect(`/home`);
					} else {
						// const id = user[0].id;
						// const log = await logUnsuccessService(id);
						const error = 'invalid email or password';
						res.render('login/login', { error });
					}
				}
			});
		} else if (user.length === 0) {
			const error = 'user not exist';
			res.render('login/login', { error });
		}
		// }
		// else {
		// 	const error_expire = 'expired password create new one';
		// 	res.redirect('/forgot');
		// }
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};
const getUserName = async (req, res) => {
	res.render('login/user');
};
const checkUser = async (req, res) => {
	try {
		const result4 = await checkUserService(req.body);
		if (result4.length > 0) {
			if (result4[0].email == req.body.email) {
				const otp = Math.floor(Math.random() * 1000000000000 + 1);
				const user = await userService(otp, req.body);
				res.render('login/user', { otp: otp });
			}
		} else if (result4.length === 0) {
			const error = 'user not valid';
			res.render('login/user', { error: error });
		}
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};
const getLink = async (req, res) => {
	try {
		const link = req.params.link;
		const user = await expireService(link);
		const timer = user[0][0].updated_at;
		const expeireTimer = new Date(
			new Date(timer).getTime() + 2 * 3600000
		).toTimeString();
		const newtime = new Date().toTimeString();
		if (newtime < expeireTimer) {
			res.redirect('/forgot');
		} else {
			res.send('expired');
		}
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};
const userLogout = async (req, res) => {
	try {
		const token = req.cookies?.token;
		return res.clearCookie('token').status(200).redirect(`/`);
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};
module.exports = {
	userLogout,
	checkUser,
	getUserName,
	userLogin,
	getLogin,
	logsService,
	logUnsuccessService,
	getLink,
};
