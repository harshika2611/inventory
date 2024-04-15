const connection = require('../../config/connection');

async function viewProfileQuery(body) {
	try {
		const getCustomers = `select firstname,lastname,dob,email,option_master.value from users inner join option_master on users.role_id = option_master.id where email = ?`;

		const [result] = await connection.execute(getCustomers, [body.email]);
		return result; //return array
	} catch (error) {
		return [];
	}
}
module.exports = { viewProfileQuery };
