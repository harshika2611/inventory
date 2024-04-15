const connection = require('../../config/connection');
const logger = require('../../logs');

async function viewProfileQuery(body) {
	try {
		const getUser = `select fname,lname,dob,email,option_master.value from users inner join option_master on users.role_id = option_master.id where email = 'admin@gmail.com'`;
		const [result] = await connection.execute(getCustomers);
		return result;
	} catch (error) {
		return [];
	}
}

// async function editProfileQuery(body) {
// 	try {
// 		const updateUser = `update users set firstname = ?, lastname = ?, dob = ?, email = ?`;
// 	} catch (error) {
// 		return [];
// 	}
// }
module.exports = { viewProfileQuery };
