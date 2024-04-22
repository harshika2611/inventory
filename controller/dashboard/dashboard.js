const logger = require('../../logs');
const { getProductStock } = require('../../service/dashboard/dashboard.js');

async function dashboard(req, res) {
  res.render('dashboard/dashboard');
}
const getApiproductStock = async (req, res) => {
  try {
    // console.log(req.user, 'alll');
    let storage = req.user.storageId;
    const [rows] = await getProductStock(storage);
    res.json(rows);
  } catch (err) {
    logger.logError(err);
  }
};
module.exports = { dashboard, getApiproductStock };
