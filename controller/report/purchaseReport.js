const logger = require('../../logs');
const {
	getpurchaseProductreport,
} = require('../../service/report/purchaseReportService');

let storage = 1;
const getpurchaseReport = (req, res) => {
	res.render('reports/purcahseReport');
};
const getApiproductPurchasereport = async (req, res) => {
	try {
		let product = req.query.product || '';

		const [rows, fields] = await getpurchaseProductreport(storage, product);

		const header = [];
		fields.forEach((ele) => {
			header.push(ele.name);
		});
		res.json({ rows, header });
	} catch (err) {
		logger.logError(err);
	}
};
module.exports = { getpurchaseReport, getApiproductPurchasereport };
