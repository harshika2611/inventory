const connection = require('../../config/connection');
const logError = require('../../logs.js').logError;

async function getAllSuppliers() {
	try {
		const [results] = await connection.execute('SELECT * FROM supplier_master');
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
}

async function getAllProducts() {
	try {
		const [results] = await connection.execute(
			'SELECT id, name FROM product_master'
		);
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
}

async function getAllWarehouses() {
	try {
		const [results] = await connection.execute(
			'SELECT id, name FROM storage_space_master WHERE storage_type = 16'
		);
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
}

async function createPurchaseOrder(data) {
	try {
		const [results] = await connection.execute(
			'INSERT INTO purchase_order (name, supplier_id, amount, payment_status, date) VALUES (?, ?, ?, ?, ?)',
			[data.name, data.supplier_id, data.amount, data.payment_status, data.date]
		);
		return results;
	} catch (error) {
		logError(error);
		return [];
	}

	// {
	// 	"fieldCount": 0,
	// 	"affectedRows": 1,
	// 	"insertId": 2,
	// 	"info": "",
	// 	"serverStatus": 2,
	// 	"warningStatus": 0,
	// 	"changedRows": 0
	// }
}

async function updatePurchaseOrder(data) {
	try {
		const [results] = await connection.execute(
			'UPDATE purchase_order SET supplier_id = ?, amount = ?, payment_status = ? WHERE id = ?',
			[data.supplier_id, data.amount, data.payment_status, data.id]
		);
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
}

async function addProductInPurchaseOrder(data) {
	try {
		const [results] = await connection.execute(
			'INSERT INTO purchase_products (purchase_id, product_id, unit_price, quantity) VALUES (?, ?, ?, ?)',
			[data.purchase_id, data.product_id, data.unit_price, data.quantity]
		);
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
}

async function updateProductInPurchaseOrder(data) {
	try {
		const [results] = await connection.execute(
			'UPDATE purchase_details SET purchase_id = ?, product_id = ?, unit_price = ?, quantity = ? WHERE id = ?',
			[
				data.purchase_id,
				data.product_id,
				data.unit_price,
				data.quantity,
				data.id,
			]
		);
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
}

async function deleteProductFromPurchaseOrder(id) {
	try {
		const [results] = await connection.execute(
			'DELETE purchase_details WHERE id = ?',
			[id]
		);
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
}

module.exports = {
	getAllSuppliers,
	createPurchaseOrder,
	updatePurchaseOrder,
	addProductInPurchaseOrder,
	updateProductInPurchaseOrder,
	deleteProductFromPurchaseOrder,
	getAllProducts,
	getAllWarehouses,
};
