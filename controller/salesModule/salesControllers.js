const logger = require('../../logs');
const {
  selectOrders,
  insertOrder,
  insertProduct,
  updateOrder,
  productList,
  deleteQuery,
  updateProduct,
  updateAmount,
  checkQuanitiy,
  updateStock,
} = require('../../service/salesModule/salesService');
const { selectQuery, selectWhere } = require('../../service/selectQuery');
// const { getCombos } = require('../../service/helper');

async function insertSalesOrder(req, res) {
  let storageId = req.user.storageId;
  let input = [
    req.body.customer,
    req.body.orderType,
    `${req.body.shippingAddress}`,
    req.body.paymentStatus,
    req.body.date,
    storageId,
  ];
  try {
    let [rows, fields] = await insertOrder(input);

    res.json({ rows });
  } catch (err) {
    logger.logError(err);
    res.json('not found');
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
    const [result] = await checkQuanitiy(req);
    if (req.body.quantity < result[0].stock) {
      const [rows, fields] = await insertProduct(input);
      res.json({ rows });
      const [updateRow] = await updateStock(req);
    } else {
      res.json({ msg: `maximum awailable Quantity is ${result[0].stock}` });
    }
  } catch (err) {
    logger.logError(err);
  }
}

async function getSalesCustomer(req, res) {
  try {
    const [rows, fields] = await selectQuery(
      'customer_master',
      'id as opt_id,firstname'
    );

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
    // if(req.user.storageId.length === 0){storageId = all};
    let order = req.query.order;
    let orderby = req.query.orderby;
    let col = req.query.col;
    let value = req.query.colValue;
    const [rows, fields] = await selectOrders(
      orderby,
      order,
      col,
      value,
      req.user.storageId
    );

    const header = [];
    fields.forEach((ele) => {
      header.push(ele.name);
    });
    res.json(rows);
  } catch (err) {
    logger.logError(err);
  }
}

async function updateSalesOrder(req, res) {
  try {
    const input = [
      req.body.customer,
      req.body.orderType,
      `${req.body.shippingAddress}`,
      req.body.paymentStatus,
      req.body.date,
      // req.user.storageId,
      req.body.orderid,
    ];

    const [rows, fields] = await updateOrder(input);

    res.json({ rows });
  } catch (err) {
    logger.logError(err);
  }
}
async function getSalesProducts(req, res) {
  try {
    let [rows, fields] = await selectQuery(
      'product_master',
      'id as opt_id,category_id,product_name'
    );
    let header = [];
    fields.forEach((ele) => {
      header.push(ele.name);
    });
    res.json({ rows, header });
  } catch (err) {
    logger.logError(err);
  }
}

// async function fetchCombos(req, res) {
// 	try {
// 		let combo = req.params.combo
// 		let rows = await getCombos(`%${combo}%`);
// 		res.json({ rows });
// 	} catch (err) {
// 		logger.logError(err);
// 	}
// }

async function productGrid(req, res) {
  try {
    let input = [req.query.orderId];
    let [rows, fields] = await productList(input);
    console.log(rows, fields);
    let header = [];
    fields.forEach((ele) => {
      header.push(ele.name);
    });
    res.json({ rows, header });
    let totalAmount = 0;
    rows.forEach((ele) => {
      totalAmount += ele.Total;
    });
    let input2 = [totalAmount, req.query.orderId];
    let data = await updateAmount(input2);
  } catch (err) {
    logger.logError(err);
    logger.logError('not found');
  }
}

async function deleteOrder(req, res) {
  try {
    let input = [req.query.id];
    let [rows] = await deleteQuery('sales_order', input);
    res.json({ rows });
  } catch (err) {
    logger.logError(err);
    res.json('not found');
  }
}

async function deleteProduct(req, res) {
  try {
    req.body.quantity = 0;
    req.body.id = req.query.id
    console.log(req.user.storageId,);
    let input = [req.query.id];
    let [flag, stock] = await updateProduct(req);

    if (true) {
      let [rows] = await deleteQuery('sales_products', input);
      res.json({ rows });
    }
  } catch (err) {
    logger.logError(err);
    res.json('not found');
  }
}

async function updateSalesProduct(req, res) {
  try {
    let [flag, stock] = await updateProduct(req);
    res.json({'flag': flag,'stock': stock});
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
  // fetchCombos,
  productGrid,
  deleteOrder,
  deleteProduct,
  updateSalesProduct,
};
