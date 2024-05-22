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
exports.storageDetails = exports.productOutOfStockGenerateReport = exports.productGenerateReport = void 0;
const connection_1 = __importDefault(require("../../config/connection"));
const logs_1 = require("../../logs");
function productGenerateReport(productReportObject, storageId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const databaseObject = productReportObject.databaseObject;
            const categoryName = productReportObject.categoryName;
            let dataShowString = '';
            for (let key in databaseObject) {
                for (let element of databaseObject[key]) {
                    dataShowString += `${key}.${element},`;
                }
            }
            const productReportQuery = `SELECT ${dataShowString.slice(0, -1)} 
      FROM product_master
      LEFT JOIN products_details ON product_master.id=products_details.product_id
      LEFT JOIN option_master ON product_master.category_id = option_master.id
      LEFT JOIN select_master ON option_master.select_id = select_master.id
      WHERE option_master.value=? AND products_details.storage_id = ? AND product_master.is_delete=?`;
            const [result] = yield connection_1.default.execute(productReportQuery, [categoryName, storageId, 0]);
            return result;
        }
        catch (error) {
            (0, logs_1.logError)('Product Report: ' + error);
            throw error;
        }
    });
}
exports.productGenerateReport = productGenerateReport;
function productOutOfStockGenerateReport(productReportObject, storageId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const maximumQunatity = productReportObject.maximumQunatity;
            const categoryName = productReportObject.categoryName;
            const productReportQuery = `SELECT product_master.product_name,product_master.sku_id,products_details.stock
      FROM product_master
      LEFT JOIN products_details ON product_master.id=products_details.product_id
      LEFT JOIN option_master ON product_master.category_id = option_master.id
      LEFT JOIN select_master ON option_master.select_id = select_master.id
      WHERE option_master.value=? AND products_details.storage_id = ? AND products_details.stock <= ? AND product_master.is_delete=?`;
            const [result] = yield connection_1.default.execute(productReportQuery, [categoryName, storageId, maximumQunatity, 0]);
            return result;
        }
        catch (error) {
            (0, logs_1.logError)('Product Out Of Stock Report: ' + error);
            throw error;
        }
    });
}
exports.productOutOfStockGenerateReport = productOutOfStockGenerateReport;
function storageDetails(storageId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!storageId) {
                const storageDetails = `SELECT s.id as storageId,s.name as StorageName,o.value as StorageType 
      FROM storage_space_master as s
      LEFT JOIN option_master as o ON s.storage_type=o.id
      LEFT JOIN city_master as c ON s.location_id=c.city_id
      LEFT JOIN state_master as st ON c.state_id=st.state_id
      WHERE s.is_delete=?`;
                const [result] = yield connection_1.default.execute(storageDetails, [0]);
                return result;
            }
            else {
                const storageDetails = `SELECT s.name as StorageName,o.value as StorageType,c.city_name as City,st.state_name as State 
    FROM storage_space_master as s
    LEFT JOIN option_master as o ON s.storage_type=o.id
    LEFT JOIN city_master as c ON s.location_id=c.city_id
    LEFT JOIN state_master as st ON c.state_id=st.state_id
    WHERE s.id=? AND s.is_delete=?`;
                const [result] = yield connection_1.default.execute(storageDetails, [storageId, 0]);
                return result;
            }
        }
        catch (error) {
            throw error;
        }
    });
}
exports.storageDetails = storageDetails;
