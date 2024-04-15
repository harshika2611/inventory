const connection = require('../../config/connection');
const listManagersService = async () => {
	try {
		const sql0 = `select * from users where role_id=?`;
		const [ans] = await connection.execute(sql0, [5]);
		return ans;
	} catch (error) {
		logger.logError(`Error`, error);
		throw error;
	}
};

const updateManagerService = async () => {
	try {
	} catch (error) {
		logger.logError(`Error`, error);
		throw error;
	}
};

const insertManagerService = async () => {
	try {
		const sql2 = `insert into users (fname,lname,email,dob,password,salt,unique_code,status)
		values (?,?,?,?,?,?,?,?,?)`;
		const [ans1] = await connection.execute(sql2, [
			body.fname,
			body.lname,
			body.email,
			body.dob,
			password,
			body.status,
		]);
		console.log(ans1);
	} catch (error) {
		logger.logError(`Error`, error);
		throw error;
	}
};

module.exports = {
	listManagersService,
	updateManagerService,
	insertManagerService,
};
