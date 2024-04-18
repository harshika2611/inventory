const connection = require('../../config/connection');
const logger = require('../../logs');

async function selectOrders(orderby, order, col, value) {
	if (order == undefined) {
		order = 'asc';
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
    sales_order.id,
    sales_order.customer_id,
    customer_master.firstname,
    customer_master.lastname,
    sales_order.amount,
    sales_order.shipping_address,
    sales_order.payment_status,
    sales_order.created_at,
    sales_order.date
  from sales_order join customer_master
  on sales_order.customer_id = customer_master.id
  where sales_order.is_delete = 0 and ${col} = '${value}' order by ${orderby} ${order} ;`;

	logger.info(sql);
	return await connection.execute(sql);
}

async function insertOrder(input) {
	sql = `insert into sales_order (id, customer_id, type, amount, shipping_address, payment_status, date, created_at, updated_at) values (default,?,?,?,?,?,?,current_timestamp(),current_timestamp());`;

	logger.info(input);
	return await connection.execute(sql, input);
}

async function insertProduct(input) {
	sql = `insert into sales_products (id, order_id, product_id, order_type, quantity) values (default,?,?,?,?);`;

	logger.info(input);
	return await connection.execute(sql, input);
}

async function updateOrder(input) {
	logger.info(input)
	let sql = `update sales_order set 
    customer_id = ?,
    type = ?,
    amount= ?,
    shipping_address= ?,
    payment_status = ?,
		date = ?
  where id = ?`;

	logger.info(input);
	return await connection.execute(sql, input);
}
async function productList(input) {
	let sql = `select sales_products.id as id, product_master.name , option_master.value as Category , sales_products.quantity from sales_products join product_master on sales_products.product_id = product_master.id join option_master on option_master.id = product_master.category_id where sales_products.order_id = ? and sales_products.is_delete = 0;`;

	logger.info(input);
	return await connection.execute(sql, input);
}
async function deleteQuery(table,input) {
	let sql = `update ${table} set is_delete = 1 where id = ?`;

	logger.info(input);
	return await connection.execute(sql, input);
}
async function updateProduct(input) {
	let sql = `update sales_products set product_id = ?,quantity = ? where id = ?`;

	logger.info(input);
	return await connection.execute(sql, input);
}

module.exports = {
	selectOrders,
	insertOrder,
	insertProduct,
	updateOrder,
	productList,
	deleteQuery,
	updateProduct
};
