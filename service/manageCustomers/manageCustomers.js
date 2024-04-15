const connection = require('../../config/connection.js');
const logger = require('../../logs.js');
const { getCityStateId } = require('../commonFunctions/commonFunctions.js');

async function insertCustomerQuery(body) {
	// return new Promise((resolve, reject) => {

	// });
	try {
		const insertCustomer = `INSERT INTO customer_maste(firstname,lastname,email,phonenumber,address,zipcode,city_id,state_id) VALUES(?,?,?,?,?,?,?,?);`;

		const cityStateId = await getCityStateId(body.state, body.city); //array contain object

		const [result] = await connection.execute(insertCustomer, [
			body.firstname,
			body.lastname,
			body.email,
			body.phonenumber,
			body.address,
			body.zipcode,
			cityStateId[0].city_id,
			cityStateId[0].state_id,
		]);
	} catch (error) {
		logger.logError('Insert Customer: ' + error);
		throw error;
	}
}

async function getCustomersQuery() {
	try {
		const getCustomers = `SELECT * FROM customer_master;`;

		const [result] = await connection.execute(getCustomers);
		return result; //return array
	} catch (error) {
		logger.logError('Get Customers: ' + error);
		return [];
	}
}

async function checkCustomerExistQuery(customerId) {
	try {
		const checkCustomer = `SELECT * as customerId FROM customer_master WHERE id=?;`;

		const [result] = await connection.execute(checkCustomer, [customerId]);
		return result;
	} catch (error) {
		logger.logError('Check customer: ' + error);
	}
}

async function updateCustomerQuery(customerId, body) {
	try {
		const customerArray = checkCustomerExistQuery(customerId);

		if (customerArray.length === 0) {
			return false;
		} else {
			const updateCustomer = `UPDATE customer_master SET firstname = ?, lastname=?, email=?,phonenumber=?,email=?,address=?,zipcode=?,city=?,state=? WHERE id=?;`;

			const [result] = connection.execute(updateCustomer, [
				body.firstname,
				body.lastname,
				body.email,
				body.phonenumber,
				body.email,
				body.address,
				body.zipcode,
				body.cityId,
				body.stateId,
				customerId,
			]);
			return true;
		}
	} catch (error) {
		logger.logError('Update Customer: ' + error);
	}
}

async function deleteCustomerQuery(customerId) {
	try {
		const deleteCustomer = `DELETE customer_master WHERE id=?`;

		const [result] = connection.execute(deleteCustomer, [customerId]);
	} catch (error) {
		logger.logError('Delete Customer: ' + error);
	}
}

module.exports = {
	insertCustomerQuery,
	getCustomersQuery,
	updateCustomerQuery,
	deleteCustomerQuery,
};
