const connection = require('../../config/connection');
const logger = require('../../logs');

async function updateOrder(input) {
	let sql = `update order_master set 
    customer_id = ?,
    type = ?,
    amount= ?,
    shipping_address= ?,
    payment_status = ?,
    updated_at = current_timestamp()
  where id = ?`;

	logger.info(input);
	return await connection.execute(sql, input);
}
module.exports = updateOrder;
