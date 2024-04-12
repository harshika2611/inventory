const { listManagersService,updateManagerService,insertManagerService } = require('../../service/manager/manager');

const listManagers = async (req, res) => {
	try {
		const result = await listManagersService();

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
		const otp=Math.floor((Math.random()*1000000000000)+1);
		const result2 = await insertManagerService();
	} catch (error) {
		logger.logError('error', error);
		res.status(500).json({ message: 'can`t fetch user controller' });
	}
}
const addManager = async (req, res) => {
	try {
		
	} catch (error) {
		
	}
}



module.exports = { listManagers,updateManager,insertManager,addManager };
