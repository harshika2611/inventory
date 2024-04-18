const logger = require('../../logs');
const { getProductStock } = require('../../service/dashboard/dashboard.js');

let storage = 1;
async function dashboard(req, res) {
	res.render('dashboard/dashboard');
}
const getApiproductStock = async (req, res) => {
	try {
		const [rows] = await getProductStock(storage);
		res.json(rows);
	} catch (err) {
		logger.logError(err);
	}
};
module.exports = { dashboard, getApiproductStock };
