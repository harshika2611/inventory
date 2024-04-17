const logger = require('../../logs.js');
const {
	storeComboServices,
	insertManagerDetail,
	checkManagerService,
	listManagersService,
	updateManagerService,
	insertManagerService,
} = require('../../service/manager/manager');

const getStoreCombo = async (req, res) => {
	try {
		const result = await storeComboServices();
		if (result.length === 0) {
			return res.status(404).json({ message: 'Something Went Wrong' });
		} else {
			return res.status(200).json({ result: result });
		}
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};

const getManager = async (req, res) => {
	res.render('manager/manager');
};

const manageManager = async (req, res) => {
	try {
		const result1 = await checkManagerService(req.body);
		if (result1.length > 0) {
			const msg = 'already added manager';
			res.status(409).send('already exist');
		} else {
			try {
				const otp = Math.floor(Math.random() * 1000000000000 + 1);
				const result2 = await insertManagerService(otp, req.body);
				const managerDetails = await insertManagerDetail(result2, req.body);
				res.status(200).send('maanger add');
			} catch (error) {
				logger.logError(error);
				res.status(500).json({ message: 'can`t fetch user controller' });
			}
		}

		// const manager = await insertManagerService();
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};

const listManagers = async (req, res) => {
	try {
		const result = await listManagersService();
		console.log(result,"aaarrr");
		res.json(result);
		for (const element of result) {
			console.log(element,'all');
		}
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
	} catch (error) {
		logger.logError(error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};
const addManager = async (req, res) => {
	try {
	} catch (error) { }
};





module.exports = {
	getStoreCombo,
	manageManager,
	getManager,
	listManagers,
	updateManager,
	insertManager,
	addManager,
};
