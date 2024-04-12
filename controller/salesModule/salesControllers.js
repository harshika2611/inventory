const logger = require("../../logs");
const {
  selectOrders,
  insertOrder,
  insertProduct,
  updateOrder,
} = require("../../service/salesModule/salesService");
const {selectQuery,selectWhere} = require("../../service/selectQuery");
const {getCombos} = require('../../service/helper');

async function insertSalesOrder(req, res) {
  let input = [
    req.body.customer,
    req.body.orderType,
    req.body.amount,
    `${req.body.shippingAddress}`,
    req.body.paymentStatus,
  ];
  try {
    let [rows, fields] = await insertOrder(input);

    logger.info(rows);
    res.json({ rows });
  } catch (err) {
    logger.logError(err);
    res.json("not found");
  }
}

async function insertSalesProduct(req, res) {
  try {
    let input = [
      req.body.orderid,
      req.body.product,
      req.body.ordertype,
      req.body.quantity,
    ];
    let [rows, fields] = await insertProduct(input);
    logger.info(rows);
    res.json({ rows });
  } catch (err) {
    logger.logError(err);
  }
}

async function getSalesCustomer(req, res) {
  try {
    let order = req.query.order;
    let orderby = req.query.orderby;
    const [rows, fields] = await selectQuery("customer_master", orderby, order);

    const header = [];
    fields.forEach((ele) => {
      header.push(ele.name);
    });
    res.json({ rows, header });
  } catch (err) {
    logger.logError(err);
  }
}

async function getsalesOrder(req, res) {
  try {
    let order = req.query.order;
    let orderby = req.query.orderby;
    const [rows, fields] = await selectOrders(orderby, order);

    const header = [];
    fields.forEach((ele) => {
      header.push(ele.name);
    });
    res.json({ rows, header });
  } catch (err) {
    logger.logError(err);
  }
}

async function updateSalesOrder(req, res) {
  try {
    const input = [
      req.body.customer_id,
      req.body.type,
      req.body.amount,
      `${req.body.addr}`,
      req.body.payment_status,
      req.body.inserted_id,
    ];

    const [rows, fields] = await updateOrder(input);

    logger.info(rows);
    res.json({ rows });
  } catch (err) {
    logger.logError(err);
  }
}
async function getSalesProducts(req, res) {
  try {
    
    let [rows, fields] = await selectWhere("product_master", 'category_id',`${req.query.category_id}` );
    let header = [];
    fields.forEach((ele) => {
      header.push(ele.name);
    });
    res.json({ rows, header });
  } catch (err) {
    logger.logError(err);
  }
}

async function getSalesCategory(req, res) {

  try {
    let [rows] = await getCombos('category');
    res.json({ rows });
    logger.info(rows)
  } catch (err) {
    logger.logError(err);
  }
}

module.exports = {
  insertSalesOrder,
  insertSalesProduct,
  getSalesCustomer,
  getsalesOrder,
  updateSalesOrder,
  getSalesProducts,
  getSalesCategory
};
