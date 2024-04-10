const connection = require('../../config/connection');
const logger = require('../../logs');
const updateQuery = require('../../service/salesModule/updateOrders');

async function updateOrder(req, res) {
	try {
		
		const header = [];
		const input = [
			req.body.customer_id,
			req.body.type,
			req.body.amount,
			`${req.body.addr}`,
      req.body.payment_status,
      req.body.inserted_id
		];

		const [rows, fields] = await updateQuery(input);

		logger.info(rows);
		res.json({ rows });
	} catch (err) {
		logger.logError(err);
	}
}
module.exports = updateOrder;
