const bcrypt = require('bcrypt');
const saltRounds = 10;
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

const checkManagerService = async (body) => {
	try {
		const sql0 = `select email from users where email=?`;
		const [result] = await connection.execute(sql0, [body.email]);
		console.log(result, 'ans');
		return result;
	} catch (error) {
		
	}
};

const insertManagerService = async (otp, body) => {
	try {
		console.log(body);
		console.log(otp);
		const sql2 = `insert into users (role_id,firstname,lastname,email,dob,unique_code,status)
		values (?,?,?,?,?,?,?)`;
		console.log(sql2);
		const [ans1] = await connection.execute(sql2, [
			5,
			body.firstname,
			body.lastname,
			body.email,
			body.dob,
			otp,
			7,
		]);
		console.log(ans1, 'aswee');
		return ans1;
	} catch (error) {
		logger.logError(`Error`, error);
		throw error;
	}
};

module.exports = {
	checkManagerService,
	listManagersService,
	updateManagerService,
	insertManagerService,
};
