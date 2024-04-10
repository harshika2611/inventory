const connection = require('../../config/connection');
const logger = require('../../logs');

async function insertOrder( input) {
	
	sql = `insert into order_master values (default,?,?,?,?,?,current_timestamp(),current_timestamp());`;

	logger.info(input);
	return await connection.execute(sql, input);
}
module.exports = insertOrder;
