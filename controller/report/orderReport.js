const logger = require('../../logs');
const {
	getOrderreport,
	getApiordersProduct,
	getOrderreportBydate,
} = require('../../service/report/orderReportService');

const getorderReport = (req, res) => {
	res.render('reports/orderReport');
};

const getorderProducts = (req, res) => {
	res.render('reports/orderProduct');
};

const getApiorderRreport = async (req, res) => {
	try {
		// console.log(Object.keys(req.query).length);
		if (Object.keys(req.query).length === 0) {
			const [rows] = await getOrderreport();
			res.json(rows);
		} else {
			let fromDate = req.query.fromDate;
			let toDate = req.query.toDate;
			const [rows] = await getOrderreportBydate(fromDate, toDate);
			// console.log(rows);
			res.json(rows);
		}
	} catch (err) {
		logger.logError(err);
	}
};

const getApiordersProductRreport = async (req, res) => {
	try {
		let id = req.params.id;
		const [rows] = await getApiordersProduct(id);
		res.json(rows);
	} catch (err) {
		logger.logError(err);
	}
};
module.exports = {
	getorderReport,
	getorderProducts,
	getApiorderRreport,
	getApiordersProductRreport,
};
