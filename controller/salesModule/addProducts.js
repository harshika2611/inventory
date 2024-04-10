const connection = require('../../config/connection');
const logger = require('../../logs');
const insertQuery = require('../../service/salesModule/insertProducts');

async function insertProduct(req, res) {
	try {
	
		const header = [];
		const input = [
			req.body.orderid,
			req.body.productid,
			req.body.ordertype,
			req.body.quantity,
		];

		const [rows, fields] = await insertQuery(input);

		logger.info(rows);
		res.json({ rows });
	} catch (err) {
		logger.logError(err);
	}
}
module.exports = insertProduct;
