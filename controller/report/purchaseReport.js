const logger = require('../../logs');
const {
  getpurchaseProductreport,
} = require('../../service/report/purchaseReportService');

const getpurchaseReport = (req, res) => {
  res.render('reports/purchaseReport', { data: req.user });
};
const getApiproductPurchasereport = async (req, res) => {
  try {
    let product = req.query.product || '';
    let storage = req.user.storageId || 1;
    const [rows] = await getpurchaseProductreport(storage, product);
    res.json(rows);
  } catch (err) {
    logger.logError(err);
  }
};
module.exports = { getpurchaseReport, getApiproductPurchasereport };
