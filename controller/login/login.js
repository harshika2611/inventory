const {
	userLoginService,
	logsService,
	logUnsuccessService,
} = require('../../service/login/login');
const md5 = require('md5');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const getLogin = async (req, res) => [res.render('login/login')];

const userLogin = async (req, res) => {
	try {
		const user = await userLoginService(req.body);
		console.log(user);
		if (user.length > 0 && user[0].status == 1) {
			const password = md5(user[0].salt + req.body.password);
			if (user[0].role_id == 4) {
				if (password == user[0].password) {
					const email = req.body.email;
					const token = jwt.sign({ email: email }, SECRET_KEY, {
						expiresIn: '2h',
					});
					const id = user[0].id;
					const logs = await logsService(id);
					return res
						.cookie('token', token, {
							httpOnly: true,
						})
						.redirect(`/home`);
				} else {
					console.log(user, 'needddd');
					const id = user[0].id;
					const log = await logUnsuccessService(id);
					const error = 'invalid password';
					res.render('login/login', { error });
				}
			} else if (user[0].role_id == 5) {
				if (password == user[0].password) {
					const email = req.body.email;
					const token = jwt.sign({ email: email }, SECRET_KEY, {
						expiresIn: '1h',
					});
					return res
						.cookie('token', token, {
							httpOnly: true,
						})
						.redirect(`/home`);
				} else {
					const log = await logUnsuccessService(id);
					const error = 'invalid password';
					res.render('login/login', { error });
				}
			}
		} else if (user.length === 0) {
			const error = 'user not exist';
			res.render('login/login', { error });
		}
	} catch (error) {
		console.error('error', error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};
module.exports = { userLogin, getLogin, logsService, logUnsuccessService };
