const connection = require('../../config/connection');
const logger = require('../../logs');

async function selectOrders(orderby, order, col, value, storageId) {
  if (order == undefined) {
    order = 'asc';
  }
  if (storageId == null) {
    storageId = '*';
  }
  if (orderby == undefined) {
    orderby = 'id';
  }
  if (orderby == 'name') {
    orderby = 'customer_master.firstname';
  } else {
    orderby = `sales_order.${orderby}`;
  }

  if (col == undefined || value == undefined) {
    col = '1';
    value = '1';
  }

  sql = `select 
    sales_order.id as ID,
    sales_order.customer_id,
    customer_master.firstname,
    customer_master.lastname,
    sales_order.amount,
		sales_order.type as OrderType,
    sales_order.shipping_address,
    sales_order.payment_status,
    sales_order.created_at,
    sales_order.date
  from sales_order join customer_master
  on sales_order.customer_id = customer_master.id
  where sales_order.is_delete = 0 and ${col} = '${value}' and storage_id = ? order by ${orderby} ${order} ;`;

  return await connection.execute(sql, [storageId]);
}

async function insertOrder(input) {
  sql = `insert into sales_order (id, customer_id, type, shipping_address, payment_status, date,storage_id) values (default,?,?,?,?,?,?);`;

  return await connection.execute(sql, input);
}

async function insertProduct(input) {
  sql = `insert into sales_products (id, order_id, product_id, order_type, quantity) values (default,?,?,?,?);`;

  return await connection.execute(sql, input);
}

async function updateOrder(input) {
  let sql = `update sales_order set 
    customer_id = ?,
    type = ?,
    shipping_address= ?,
    payment_status = ?,
		date = ?
  where id = ?`;

  return await connection.execute(sql, input);
}
async function productList(input) {
  let sql = `select sales_products.id as id, product_master.product_name , option_master.value as Category , sales_products.quantity,product_master.cost as UnitPrice ,(sales_products.quantity * product_master.cost ) as Total from sales_products join product_master on sales_products.product_id = product_master.id join option_master on option_master.id = product_master.category_id where sales_products.order_id = ? and sales_products.is_delete = 0;`;

  return await connection.execute(sql, input);
}
async function deleteQuery(table, input) {
  let sql = `update ${table} set is_delete = 1 where id = ?`;

  return await connection.execute(sql, input);
}
async function updateProduct(req) {
  const [prevQuantity] = await connection.execute(
    `select sales_products.product_id,(sales_products.quantity+ products_details.stock) as total_stock from sales_products join products_details on sales_products.product_id = products_details.product_id where sales_products.id = ? and products_details.storage_id = ?;`,
    [req.body.id, req.user.storageId]
  );

  if (prevQuantity[0].total_stock > req.body.quantity) {
    const [result] = await connection.execute(
      `update products_details set stock = ( ?-?) where product_id = ? and storage_id = ?;`,
      [
        prevQuantity[0].total_stock,
        req.body.quantity,
        prevQuantity[0].product_id,
        req.user.storageId,
      ]
    );
    const [data] = await connection.execute(
      `update sales_products set quantity = ? where id = ?`,
      [req.body.quantity, req.body.id]
    );

    return [true, 0];
  } else {
    return [false, prevQuantity[0].total_stock];
  }
}

async function updateAmount(input) {
  try {
    return await connection.execute(
      `update sales_order set amount = ? where id = ?;`,
      input
    );
  } catch (e) {
    logger.logError(e);
  }
}

async function checkQuanitiy(req, type) {
  try {
    const [result] = await connection.execute(
      `select stock from products_details where product_id = ? and storage_id = ?`,
      [req.body.product, req.user.storageId]
    );
    return result[0].stock;
  } catch (e) {
    logger.logError(e);
  }
}

async function updateStock(req) {
  const [data] = await connection.execute(
    `update products_details set stock = ? where product_id = ? and storage_id = ?`,
    [result[0].stock - req.body.quantity, req.body.product, req.user.storageId]
  );
  logger.info(data);
}

async function getOrderDetail(req) {
  try {
    sql = `select customer_master.*,(select city_name from city_master where city_id = customer_master.city_id)as city_name,(select state_name from state_master where state_id = customer_master.state_id) as state_name,sales_order.amount,sales_order.shipping_address,(select value from option_master where id = sales_order.type) as type,(select value from option_master where id = sales_order.payment_status) as payment_status,sales_order.date from sales_order join customer_master on sales_order.customer_id = customer_master.id where  sales_order.id = ? and storage_id = ?;`;
    return connection.execute(sql, [req.query.id,req.user.storageId]);
  } catch (err) {
    logger.logError(err);
  }
}

module.exports = {
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
  getOrderDetail,
};
