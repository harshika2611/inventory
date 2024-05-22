"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPurchaseOrderView = exports.deletePurchaseOrder = exports.fetchPurchaseOrders = exports.getProductsByCategory = exports.fetchPurchaseOrder = exports.getAllWarehouses = exports.getAllProducts = exports.deleteProductFromPurchaseOrder = exports.updateProductInPurchaseOrder = exports.addProductInPurchaseOrder = exports.updatePurchaseOrder = exports.createPurchaseOrder = exports.getAllSuppliers = void 0;
const connection_1 = __importDefault(require("../../config/connection"));
const logs_1 = require("../../logs");
function getAllSuppliers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute('SELECT * FROM supplier_master');
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.getAllSuppliers = getAllSuppliers;
function getAllProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute('SELECT id, product_name, is_delete as deleted FROM product_master');
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.getAllProducts = getAllProducts;
function getProductsByCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute('SELECT `id`, `product_name`, is_delete as deleted FROM product_master WHERE `category_id` = ?', [id]);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.getProductsByCategory = getProductsByCategory;
function getAllWarehouses() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute(`SELECT
        s.id,
        s.name,
        s.storage_type,
        c.city_name,
        o.value,
        s.is_delete
      FROM
        storage_space_master as s
          join
        city_master as c
          on
        s.location_id = c.city_id
          join
        option_master as o
          on
        o.id = s.storage_type
      `);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.getAllWarehouses = getAllWarehouses;
function fetchPurchaseOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute(`SELECT
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
            AND
          po.is_delete != 1
		`, [data.id]);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.fetchPurchaseOrder = fetchPurchaseOrder;
function createPurchaseOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute('INSERT INTO purchase_order (name, supplier_id, storage_id, payment_status, date) VALUES (?, ?, ?, ?, ?)', [
                data.name || '',
                data.supplier_id,
                data.storage_id,
                data.payment_status,
                data.date,
            ]);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
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
    });
}
exports.createPurchaseOrder = createPurchaseOrder;
function updatePurchaseOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute('UPDATE purchase_order SET name = ?, date = ?, payment_status = ? WHERE id = ?', [data.name, data.date, data.payment_status, data.id]);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.updatePurchaseOrder = updatePurchaseOrder;
function addProductInPurchaseOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const [results] = yield connection_1.default.execute(`
      INSERT INTO purchase_products (purchase_id, product_id, unit_price, quantity) VALUES (?, ?, ?, ?);
      `, [data.purchase_id, data.product_id, data.unit_price, data.quantity]);
            if (results === null || results === void 0 ? void 0 : results.insertId) {
                const exists = yield connection_1.default.execute(`
        SELECT
          COUNT(product_id) as count
        FROM
          products_details
        WHERE
          product_id = ?
            AND
          storage_id = ?
      `, [data.product_id, data.storage_id]);
                if (Number((_a = exists[0][0]) === null || _a === void 0 ? void 0 : _a.count) > 0) {
                    yield connection_1.default.execute(`
          UPDATE products_details
            SET
              stock = stock + ?
            WHERE
              product_id = ?
                AND
              storage_id = ?
        `, [data.quantity, data.product_id, data.storage_id]);
                }
                else {
                    yield connection_1.default.execute(`
          INSERT INTO products_details
            (product_id, storage_id, stock)
          VALUES
            (?, ?, ?)
        `, [data.product_id, data.storage_id, data.quantity]);
                }
            }
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.addProductInPurchaseOrder = addProductInPurchaseOrder;
function updateProductInPurchaseOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield connection_1.default.execute(`
      SELECT
        (? - quantity) as diff
      FROM
        purchase_products
      WHERE
        id = ?
    `, [data.quantity, data.id]);
            const [results] = yield connection_1.default.execute(`
      UPDATE
        purchase_products
          SET
            unit_price = ?,
            quantity = ?
          WHERE
            id = ?
    `, [data.unit_price, data.quantity, data.id]);
            yield connection_1.default.execute(`  
      UPDATE
        products_details
          SET
            stock = stock + ?
          WHERE
            product_id = ?
              AND
            storage_id = ?`, [result[0].diff, data.product_id, data.storage_id]);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.updateProductInPurchaseOrder = updateProductInPurchaseOrder;
function deleteProductFromPurchaseOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [result] = yield connection_1.default.execute(`  
      SELECT
        product_id, quantity
      FROM
        purchase_products
      WHERE
        id = ?`, [data.id]);
            yield connection_1.default.execute(`
      UPDATE
        products_details
          SET
            stock = stock - ?
          WHERE
            product_id = ?
              AND
            storage_id = ?`, [result[0].quantity, result[0].product_id, data.storage_id]);
            const [results] = yield connection_1.default.execute('UPDATE purchase_products SET is_delete = 1 WHERE id = ?', [data.id]);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.deleteProductFromPurchaseOrder = deleteProductFromPurchaseOrder;
function fetchPurchaseOrders(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute(`SELECT
        purchase.id,
        purchase.name as oname,
        supplier.firstname as fname,
        supplier.companyname as company,
        supplier.phonenumber as phone,
        supplier.gst as gst,
        purchase.amount as amount,
        payment_status,
        purchase.\`is_delete\`,
        purchase.\`date\` as date
      FROM
        purchase_order AS purchase
            JOIN
        supplier_master AS supplier ON purchase.supplier_id = supplier.id
      WHERE
        purchase.storage_id = ${data.storage_id}
          AND
        payment_status = ${data.payment_status}
      ORDER BY
        ${(data === null || data === void 0 ? void 0 : data.field) ? `\`${data.field}\` ${data.order}` : ''}
      `);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.fetchPurchaseOrders = fetchPurchaseOrders;
function deletePurchaseOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute('UPDATE purchase_order SET is_delete = 1 WHERE id = ?', [data.id]);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.deletePurchaseOrder = deletePurchaseOrder;
function fetchPurchaseOrderView(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.user.storageId == null) {
                req.user.storageId = req.query.storageId;
            }
            const [results] = yield connection_1.default.execute('select supplier_master.*,purchase_order.id as order_id,(select city_name from city_master where city_id = supplier_master.city_id)as city_name,(select state_name from state_master where state_id = supplier_master.state_id) as state_name,purchase_order.amount,(select value from option_master where id = purchase_order.payment_status) as payment_status,purchase_order.date as order_date from purchase_order join supplier_master on purchase_order.supplier_id = supplier_master.id where  purchase_order.id = ?;', [req.query.invoiceId]);
            const [products] = yield connection_1.default.execute(`select
        purchase_products.id,
        purchase_products.quantity,
        product_master.product_name,
        product_master.sku_id,
        product_master.cost
      from
        purchase_products
          join
        product_master
          on
        purchase_products.product_id = product_master.id
      where
        purchase_products.purchase_id = ?
          and
        purchase_products.is_delete = 0;
      `, [req.query.invoiceId]);
            return [results, products];
        }
        catch (error) {
            (0, logs_1.logError)(error);
        }
    });
}
exports.fetchPurchaseOrderView = fetchPurchaseOrderView;
