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
module.exports = { listManagersService };
