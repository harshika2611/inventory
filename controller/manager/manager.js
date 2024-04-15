const { checkLogin } = require('../../middleware/auth');
const {
	checkManagerService,
	listManagersService,
	updateManagerService,
	insertManagerService,
} = require('../../service/manager/manager');

const getManager = async (req, res) => {
	res.render('manager/manager');
};

const listManagers = async (req, res) => {
	try {
		const result = await listManagersService();

		res.json(result);
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};

const updateManager = async (req, res) => {
	try {
		const result1 = await updateManagerService();
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};

const insertManager = async (req, res) => {
	try {
		console.log(req.body);
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};
const addManager = async (req, res) => {
	try {
	} catch (error) {}
};
const manageManager = async (req, res) => {
	try {
		console.log(req.body, 'aaaaaaaa');

		const result1 = await checkManagerService(req.body);
		console.log(result1);
		console.log(result1.length, 'cons');
		if (result1.length > 0) {
			const msg = 'already added manager';
			console.log('in');
			// res.status(200).send('registered');
			res.render('manager/manager', { msg: msg });
		} else {
			try {
				const otp = Math.floor(Math.random() * 1000000000000 + 1);
				console.log('out');
				const result2 = await insertManagerService(otp, req.body);
				console.log(result2, 'ans');
				res.status(201).send('maanger add');
			} catch (error) {
				console.log(error);
			}
		}

		// const manager = await insertManagerService();
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	manageManager,
	getManager,
	listManagers,
	updateManager,
	insertManager,
	addManager,
};
