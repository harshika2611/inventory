const connection = require('../../config/connection');
const logger = require('../../logs');
const getOrders = require('../../service/salesModule/getOrders');

async function getsales(req, res) {
	try {
		let order = req.query.order;
		let orderby = req.query.orderby;

		if (order == undefined) {
			order = 'asc';
		}

		if (orderby == undefined) {
			orderby = 'id';
		}
		if (orderby == 'name') {
			orderby = 'customer_master.name';
		} else {
			orderby = `order_master.${orderby}`;
		}

		const [rows, fields] = await getOrders(orderby, order);

		const header = [];
		fields.forEach((ele) => {
			header.push(ele.name);
		});
		res.json({ rows, header });
	} catch (err) {
		logger.logError(err);
	}
}
module.exports = getsales;
