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

		const [rows] = await getpurchaseProductreport(storage, product);
		res.json(rows);
	} catch (err) {
		logger.logError(err);
	}
};
module.exports = { getpurchaseReport, getApiproductPurchasereport };
