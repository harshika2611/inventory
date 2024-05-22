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
exports.storeProductQuery = exports.deleteStoreProductQuery = exports.checkStoreExistQuery = exports.deleteStoreQuery = exports.updateStoreQuery = exports.getStoreQuery = exports.insertStoreQuery = void 0;
const connection_1 = __importDefault(require("../../config/connection"));
const logs_1 = require("../../logs");
const commonFunctions_1 = require("../commonFunctions/commonFunctions");
function insertStoreQuery(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertStore = `INSERT INTO storage_space_master (name,storage_type,location_id) VALUES(?,?,?);`;
            const cityStateId = yield (0, commonFunctions_1.getCityStateId)(body.state, body.city);
            const [result] = yield connection_1.default.execute(insertStore, [
                body.storageName,
                body.storeType,
                cityStateId[0].city_id,
            ]);
            // console.log(result);
        }
        catch (error) {
            (0, logs_1.logError)('Insert Store: ' + error);
        }
    });
}
exports.insertStoreQuery = insertStoreQuery;
function getStoreQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getStores = `SELECT s.id as storeId ,s.name as StorageName, s.is_delete , option_master.value as StorageType , city_master.city_name as Location,s.created_at as CreatedTime FROM storage_space_master as s left join option_master on s.storage_type = option_master.id left join city_master on city_master.city_id=s.location_id`;
            const [result] = yield connection_1.default.execute(getStores);
            // console.log(result)
            return result; //return array
        }
        catch (error) {
            (0, logs_1.logError)('Get Stores: ' + error);
            return [];
        }
    });
}
exports.getStoreQuery = getStoreQuery;
function checkStoreExistQuery(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkStore = `SELECT s.id as storeId ,s.name as Storagename , option_master.value as StorageType ,option_master.id as StorageTypeId ,state_master.state_name as state,city_master.city_name as city FROM storage_space_master as s left join option_master on s.storage_type = option_master.id left join city_master on city_master.city_id=s.location_id left join state_master on state_master.state_id=city_master.state_id WHERE s.id=?;`;
            const [result] = yield connection_1.default.execute(checkStore, [
                storeId,
            ]);
            // console.log(result);
            // console.log(storeId);
            return result;
        }
        catch (error) {
            (0, logs_1.logError)('Check store: ' + error);
            throw error;
        }
    });
}
exports.checkStoreExistQuery = checkStoreExistQuery;
function updateStoreQuery(body, storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(storeId);
            const updateStore = `UPDATE storage_space_master as s SET s.name=?, s.storage_type = ?, s.location_id=? WHERE s.id=?;`;
            const cityStateId = yield (0, commonFunctions_1.getCityStateId)(body.state, body.city);
            const [result] = yield connection_1.default.execute(updateStore, [
                body.storageName,
                body.storeType,
                cityStateId[0].city_id,
                storeId,
            ]);
            // console.log(result, "result");
            return true;
        }
        catch (error) {
            (0, logs_1.logError)('Update Customer: ' + error);
            throw error;
        }
    });
}
exports.updateStoreQuery = updateStoreQuery;
function deleteStoreQuery(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("queryid",storeId);
        try {
            const deleteStore = `update storage_space_master set is_delete = '1' where id = ?`;
            const deleteManager = `update manager_details set is_delete = '1' where storage_id = ?`;
            const deletePurchase = `update purchase_order set is_delete = '1' where storage_id = ?`;
            const deleteSales = `update sales_order set is_delete = '1' where storage_id = ?`;
            const deleteProduct = `update products_details set is_delete='1' where storage_id = ?`;
            // console.log(deleteStore);
            const [result] = yield connection_1.default.execute(deleteStore, [storeId]);
            const [result1] = yield connection_1.default.execute(deleteManager, [storeId]);
            const [result2] = yield connection_1.default.execute(deletePurchase, [storeId]);
            const [result3] = yield connection_1.default.execute(deleteSales, [storeId]);
            const [result4] = yield connection_1.default.execute(deleteProduct, [storeId]);
            // console.log(result4);
        }
        catch (error) {
            (0, logs_1.logError)('Delete Store: ' + error);
        }
    });
}
exports.deleteStoreQuery = deleteStoreQuery;
function deleteStoreProductQuery(storeId, productId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteStoreProduct = `update products_details set is_delete = '1' where storage_id = ? and product_id =?;`;
            const [result] = yield connection_1.default.execute(deleteStoreProduct, [
                storeId,
                productId,
            ]);
        }
        catch (error) {
            (0, logs_1.logError)('Delete Store Product: ' + error);
        }
    });
}
exports.deleteStoreProductQuery = deleteStoreProductQuery;
function storeProductQuery(storeId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeProducts = `SELECT users.firstname, storage_space_master.name, product_master.id,product_name AS Productname,sku_id AS SKUid,option_master.value AS Category,cost AS Cost,description AS Description, products_details.stock,products_details.is_delete FROM product_master LEFT JOIN products_details ON product_master.id = products_details.product_id LEFT JOIN option_master ON product_master.category_id = option_master.id left join storage_space_master on storage_space_master.id = products_details.storage_id left join manager_details on storage_space_master.id = manager_details.storage_id left join users on users.id = manager_details.user_id where products_details.storage_id=? ;`;
            const [storeResult] = yield connection_1.default.execute(storeProducts, [storeId]);
            return storeResult;
        }
        catch (error) {
            (0, logs_1.logError)('Store Product : ' + error);
        }
    });
}
exports.storeProductQuery = storeProductQuery;
