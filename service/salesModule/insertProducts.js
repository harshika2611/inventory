const connection = require('../../config/connection');
const logger = require('../../logs');

async function insertProduct(input) {
	
  sql = `insert into order_details (id, order_id, product_id, order_type, quantity) values (default,?,?,?,?);`;

	logger.info(input);
	return await connection.execute(sql, input);
}
module.exports = insertProduct;
