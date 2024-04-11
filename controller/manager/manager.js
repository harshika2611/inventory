const { listManagersService,updateManagerService,insertManagerService } = require('../../service/manager/manager');

const listManagers = async (req, res) => {
	try {
		const result = await listManagersService();
		console.log(result, 'connnnn');
		res.json(result);
	} catch (error) {
		logger.logError('error', error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
};

const updateManager = async (req, res) => {
	try {
		const result1 = await updateManagerService();

	} catch (error) {
		logger.logError('error', error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
}

const insertManager = async (req, res) => {
	try {
		const result2 = await insertManagerService();
	} catch (error) {
		logger.logError('error', error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
}


module.exports = { listManagers,updateManager,insertManager };
