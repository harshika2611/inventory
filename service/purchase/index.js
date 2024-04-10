const connection = require('../config/connection');
const logError = require('../logs.js').logError;

async function getCombos(name) {
	try {
		const [results] = await connection.execute(
			`
        SELECT
            s.id, o.id as opt_id, value
        FROM
            select_master AS s
                INNER JOIN
            option_master AS o ON s.id = o.select_id
        WHERE
            s.value LIKE ?
    `,
			[name]
		);
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
}

async function getAllSuppliers() {
	try {
		const [results] = await connection.execute('SELECT * FROM supplier_master');
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
}

async function createPurchaseOrder(data) {
	try {
		const [results] = await connection.execute(
			'INSERT INTO purchase_order (supplier_id, amount, payment_status) VALUES (?, ?, ?)',
			[data.supplier_id, data.amount, data.payment_status]
		);
		return results;
	} catch (error) {
		logError(error);
		return [];
	}
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
			'INSERT INTO purchase_details (purchase_id, product_id, unit_price, quantity) VALUES (?, ?, ?, ?)',
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
	getCombos,
	createPurchaseOrder,
	updatePurchaseOrder,
	addProductInPurchaseOrder,
	updateProductInPurchaseOrder,
	deleteProductFromPurchaseOrder,
};
