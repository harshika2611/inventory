const { getOrderDetail } = require('../../service/salesModule/salesService');
const logger = require('../../logs');
const orderHistory = (req, res) => {
  res.render('salesModule/sales', { data: req.user });
};
const newOrder = (req, res) => {
  res.render('salesModule/form', { data: req.user });
};

const invoicePdf = async (req, res) => {
  try {
    const [result, products] = await getOrderDetail(req);
    res.render('salesModule/invoice', { data: result[0],products });
  } catch (err) {
    logger.logError(err);
  }
};

const invoiceview = async (req, res) => {
  try {
    const [result, products] = await getOrderDetail(req);
    res.render('salesModule/orderView', { data: result[0],products });
  } catch (err) {
    logger.logError(err);
  }
};

module.exports = { orderHistory, newOrder, invoicePdf ,invoiceview};
