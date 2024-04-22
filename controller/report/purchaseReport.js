const logger = require('../../logs');
const {
  getpurchaseProductreport,
} = require('../../service/report/purchaseReportService');

const getpurchaseReport = (req, res) => {
  res.render('reports/purcahseReport');
};
const getApiproductPurchasereport = async (req, res) => {
  try {
    let product = req.query.product || '';
    let storage = req.user.storageId;
    const [rows] = await getpurchaseProductreport(storage, product);
    res.json(rows);
  } catch (err) {
    logger.logError(err);
  }
};
module.exports = { getpurchaseReport, getApiproductPurchasereport };
