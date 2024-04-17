const { logError } = require('../../logs');
const logger = require('../../logs.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const connection = require('../../config/connection');

const storeComboServices = async () => {
	try {
		const sql4 = `SELECT storage_space_master.id,city_master.city_name FROM storage_space_master join city_master on storage_space_master.location_id=city_master.city_id;`;
		const [result4] = await connection.execute(sql4);
		return result4;
	} catch (error) {
		logger.logError(`Error`, error);
		throw error;
	}
};

const listManagersService = async () => {
	try {
		const sql0 = `SELECT firstname, lastname,email,name,city_name, status, users.created_at,users.updated_at FROM users 
		JOIN manager_details ON users.id=manager_details.user_id 
		JOIN storage_space_master ON storage_space_master.id=manager_details.storage_id 
		JOIN city_master ON city_master.city_id=storage_space_master.location_id where status=6;`;
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
		return result;
	} catch (error) {
		logger.logError(`Error`, error);
		throw error;
	}
};

const insertManagerService = async (otp, body) => {
	try {
		const sql2 = `insert into users (role_id,firstname,lastname,email,dob,unique_code,expiry,status)
		values (?,?,?,?,?,?,?,?)`;

		const [ans1] = await connection.execute(sql2, [
			5,
			body.firstname,
			body.lastname,
			body.email,
			body.dob,
			otp,
			new Date(),
			7,
		]);
		return ans1.insertId;
	} catch (error) {
		logger.logError(`Error`, error);
		throw error;
	}
};
const insertManagerDetail = async (result2, body) => {
	try {
		const sql3 = `INSERT INTO manager_details (user_id,storage_id)
		values(?,?)`;
		const [ans2] = await connection.execute(sql3, [result2, body.state]);
		return ans2;
	} catch (error) {
		logger.logError(`Error`, error);
		throw error;
	}
};

module.exports = {
	storeComboServices,
	insertManagerDetail,
	checkManagerService,
	listManagersService,
	updateManagerService,
	insertManagerService,
};
