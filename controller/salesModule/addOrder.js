const connection = require('../../config/connection');
const logger = require('../../logs');
const insertQuery = require('../../service/salesModule/insertOrder');

async function insertOrder(req, res) {
	try {
		
		const header = [];
		const input = [
			req.body.customer_id,
			req.body.type,
			req.body.amount,
			`${req.body.addr}`,
			req.body.payment_status,
		];

		const [rows, fields] = await insertQuery(sql, input);

		logger.info(rows);
		res.json({ rows });
	} catch (err) {
		logger.logError(err);
	}
}
module.exports = insertOrder;
