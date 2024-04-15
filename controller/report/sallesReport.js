const logger = require("../../logs");
const {
  getProductreport,
  getCategotyreport,
} = require("../../service/report/sellesReportService");

const getsallesReport = (req, res) => {
  res.render("reports/sallesReport");
};
const getReportallProducts = (req, res) => {
  res.render("reports/allProducts");
};

const getApiproductreport = async (req, res) => {
  try {
    const [rows, fields] = await getProductreport();

    const header = [];
    fields.forEach((ele) => {
      header.push(ele.name);
    });
    res.json({ rows, header });
  } catch (err) {
    logger.logError(err);
  }
};

const getApicategoryreport = async (req, res) => {
  try {
    const [rows, fields] = await getCategotyreport();

    const header = [];
    fields.forEach((ele) => {
      header.push(ele.name);
    });
    res.json({ rows, header });
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
