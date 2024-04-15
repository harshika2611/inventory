const logger = require("../../logs");
const {
  getpurchaseProductreport,
} = require("../../service/report/purchaseReportService");

const getpurchaseReport = (req, res) => {
  res.render("reports/purcahseReport");
};
const getApiproductPurchasereport = async (req, res) => {
  try {
    const [rows, fields] = await getpurchaseProductreport();

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
