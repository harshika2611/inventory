const { query } = require('../../config/connection');
const logger = require('../../logs');
const {
  getOrderreport,
  getApiordersProduct,
  getOrderreportBydate,
  getOrderDayreport,
} = require('../../service/report/orderReportService');

const getorderReport = (req, res) => {
  res.render('reports/orderReport', { data: req.user });
};

const getorderProducts = (req, res) => {
  res.render('reports/orderProduct', { data: req.user });
};

const getApiorderRreport = async (req, res) => {
  try {
    let queryLength = Object.keys(req.query).length;
    if (queryLength === 0) {
      const [rows] = await getOrderreport();
      res.json(rows);
    } else if (queryLength == 1) {
      let query = Object.keys(req.query);
      const [rows] = await getOrderDayreport(query[0], req.query[query[0]]);
      res.json(rows);
    } else {
      let fromDate = req.query.fromDate;
      let toDate = req.query.toDate;
      const [rows] = await getOrderreportBydate(fromDate, toDate);
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
