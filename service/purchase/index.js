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
      'SELECT id, product_name FROM product_master'
    );
    return results;
  } catch (error) {
    logError(error);
    return [];
  }
}

async function getProductsByCategory(id) {
  try {
    const [results] = await connection.execute(
      'SELECT `id`, `product_name` FROM product_master WHERE `category_id` = ?',
      [id]
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

async function fetchPurchaseOrder(data) {
  try {
    const [results] = await connection.execute(
      `SELECT
          po.*,
          pm.category_id as category_id,
          pp.id as product_purchase_id,
          pp.product_id,
          pp.unit_price,
          pp.quantity
	  	  FROM
          purchase_order as po
            left join
          purchase_products as pp
            ON po.id = pp.purchase_id AND pp.is_delete != 1
            left join
          product_master as pm
            ON pp.product_id = pm.id
        WHERE
          po.id = ?          
		`,
      [data.id]
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
      'UPDATE purchase_order SET name = ?, date = ?, supplier_id = ?, amount = ?, payment_status = ? WHERE id = ?',
      [
        data.name,
        data.date,
        data.supplier_id,
        data.amount,
        data.payment_status,
        data.id,
      ]
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
      'UPDATE purchase_products SET purchase_id = ?, product_id = ?, unit_price = ?, quantity = ? WHERE id = ?',
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
      'UPDATE purchase_products SET is_delete = 1 WHERE id = ?',
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
  fetchPurchaseOrder,
  getProductsByCategory,
};
