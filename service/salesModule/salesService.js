const connection = require("../../config/connection");
const logger = require("../../logs");

async function selectOrders(orderby, order) {

  if (order == undefined) {
    order = "asc";
  }
  if (orderby == undefined) {
    orderby = "id";
  }
  if (orderby == "name") {
    orderby = "customer_master.name";
  } else {
    orderby = `order_master.${orderby}`;
  }
  
  sql = `select 
    order_master.id,
    order_master.customer_id,
    customer_master.name,
    order_master.amount,
    order_master.shipping_address,
    order_master.payment_status,
    order_master.created_at
  from order_master join customer_master
  on order_master.customer_id = customer_master.id
  order by ${orderby} ${order};`;

  logger.info(sql);
  return await connection.execute(sql);
}

async function insertOrder( input) {
	
	sql = `insert into order_master values (default,?,?,?,?,?,current_timestamp(),current_timestamp());`;

	logger.info(input);
	return await connection.execute(sql, input);
}

async function insertProduct(input) {
	
  sql = `insert into order_details (id, order_id, product_id, order_type, quantity) values (default,?,?,?,?);`;

	logger.info(input);
	return await connection.execute(sql, input);
}

async function updateOrder(input) {
	let sql = `update order_master set 
    customer_id = ?,
    type = ?,
    amount= ?,
    shipping_address= ?,
    payment_status = ?,
    updated_at = current_timestamp()
  where id = ?`;

	logger.info(input);
	return await connection.execute(sql, input);
}

module.exports = {selectOrders,insertOrder,insertProduct,updateOrder};