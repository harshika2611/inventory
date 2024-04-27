const { getOrderDetail } = require('../../service/salesModule/salesService');
const logger = require('../../logs');
const { fetchPurchaseOrderView } = require('../../service/purchase/index');
const orderHistory = (req, res) => {
  res.render('salesModule/sales', { data: req.user });
};
const newOrder = (req, res) => {
  res.render('salesModule/form', { data: req.user });
};

const invoicePdf = async (req, res) => {
  try {
    let [result, products] = [];
    if (req.query.type == 'invoice') {
      [result, products] = await getOrderDetail(req);
    } else {
      [result, products] = await fetchPurchaseOrderView(req);
    }
    data = result[0];
    let date = new Date(data.order_date);
    data.order_date =
      date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    res.render((req.query.token === undefined?'salesModule/orderView':'salesModule/invoice'), { data, products, user: req.user ,type: req.query.type});
  } catch (err) {
    logger.logError(err);
  }
};

module.exports = { orderHistory, newOrder, invoicePdf };
