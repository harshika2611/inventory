const logger = require('../../logs');
const {
	getProductreport,
	getCategotyreport,
} = require('../../service/report/sellesReportService');

const getsallesReport = (req, res) => {
	res.render('reports/sallesReport');
};
const getReportallProducts = (req, res) => {
	res.render('reports/allProducts');
};
let storage = 1;
const getApiproductreport = async (req, res) => {
	try {
		const [rows] = await getProductreport(storage);
		res.json(rows);
	} catch (err) {
		logger.logError(err);
	}
};

const getApicategoryreport = async (req, res) => {
	try {
		const [rows] = await getCategotyreport(storage);
		res.json(rows);
	} catch (err) {
		logger.logError(err);
	}
};
module.exports = {
	getsallesReport,
	getReportallProducts,
	getApiproductreport,
	getApicategoryreport,
};
