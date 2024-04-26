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
  if (req.query.type == 'invoice') {
    try {
      const [result, products] = await getOrderDetail(req);

      data = result[0];
      let date = new Date(data.order_date);
      data.order_date =
        date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      res.render('salesModule/invoice', { data, products,user:req.user});
    } catch (err) {
      logger.logError(err);
    }
  } else {
    try {
      const [result, products] = await fetchPurchaseOrderView(req);
      data = result[0];
      let date = new Date(data.order_date);
      data.order_date =
        date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      res.render('salesModule/invoice', { data, products ,user:req.user});
    } catch (err) {
      logger.logError(err);
    }
  }
};

const invoiceview = async (req, res) => {
  if (req.query.type == 'invoice') {
    try {
      // console.log(req.params);
      const [result, products] = await getOrderDetail(req);
      data = result[0];
      let date = new Date(data.order_date);
      data.order_date =
        date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      res.render('salesModule/orderView', {
        data,
        products,
        type: req.query.type,user:req.user
      });
    } catch (err) {
      logger.logError(err);
    }
  } else {
    try {
      // console.log(req.params);
      const [result, products] = await fetchPurchaseOrderView(req);
      data = result[0];
      let date = new Date(data.order_date);
      data.order_date =
        date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      res.render('salesModule/orderView', {
        data,
        products,
        type: req.query.type,user:req.user
      });
    } catch (err) {
      logger.logError(err);
    }
  }
};

module.exports = { orderHistory, newOrder, invoicePdf, invoiceview };
