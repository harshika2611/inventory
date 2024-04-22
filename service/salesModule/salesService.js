const connection = require('../../config/connection');
const logger = require('../../logs');

async function selectOrders(orderby, order, col, value,storageId) {
	if (order == undefined) {
		order = 'asc';
	}
	if (storageId == null) {
		storageId='*'
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

	logger.info(sql);
	return await connection.execute(sql,[storageId]);
}

async function insertOrder(input) {
	sql = `insert into sales_order (id, customer_id, type, shipping_address, payment_status, date,storage_id) values (default,?,?,?,?,?,?);`;

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
    shipping_address= ?,
    payment_status = ?,
		date = ?,
		storage_id = ?
  where id = ?`;

	logger.info(input);
	return await connection.execute(sql, input);
}
async function productList(input) {
	let sql = `select sales_products.id as id, product_master.product_name , option_master.value as Category , sales_products.quantity,product_master.cost as UnitPrice ,(sales_products.quantity * product_master.cost ) as Total from sales_products join product_master on sales_products.product_id = product_master.id join option_master on option_master.id = product_master.category_id where sales_products.order_id = ? and sales_products.is_delete = 0;`;

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

async function updateAmount(input) {
	try {
		return await connection.execute(`update sales_order set amount = ? where id = ?;`,input)
	}
	catch (e) {
		logger.info(e);
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
	updateAmount
};
