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
exports.reactivateCustomerQuery = exports.deleteCustomerQuery = exports.updateCustomerQuery = exports.checkCustomerExistQuery = exports.getCustomersQuery = exports.insertCustomerFromFileQuery = exports.insertCustomerQuery = void 0;
const connection_1 = __importDefault(require("../../config/connection"));
const logs_1 = require("../../logs");
const commonFunctions_1 = require("../commonFunctions/commonFunctions");
function insertCustomerQuery(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertCustomer = `INSERT INTO customer_master(firstname,lastname,email,phonenumber,address,zipcode,city_id,state_id) VALUES(?,?,?,?,?,?,?,?);`;
            const cityStateId = yield (0, commonFunctions_1.getCityStateId)(body.state, body.city); //array contain object
            const [result] = yield connection_1.default.execute(insertCustomer, [
                body.firstname,
                body.lastname,
                body.email,
                body.phonenumber,
                body.address,
                body.zipcode,
                cityStateId[0].city_id,
                cityStateId[0].state_id,
            ]);
        }
        catch (error) {
            (0, logs_1.logError)('Insert Customer: ' + error);
            throw error;
        }
    });
}
exports.insertCustomerQuery = insertCustomerQuery;
function insertCustomerFromFileQuery(customerArray) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertCustomer = 'INSERT INTO customer_master(firstname,lastname,email,phonenumber,address,zipcode,city_id,state_id) VALUES (?,?,?,?,?,?,?,?)';
            for (let element of customerArray) {
                const [result] = yield connection_1.default.execute(insertCustomer, [
                    element[0],
                    element[1],
                    element[2],
                    element[3],
                    element[4],
                    element[5],
                    element[6],
                    element[7],
                ]);
            }
        }
        catch (error) {
            (0, logs_1.logError)('Insert Customer: ' + error);
            throw error;
        }
    });
}
exports.insertCustomerFromFileQuery = insertCustomerFromFileQuery;
function getCustomersQuery(customerStatus) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getCustomers = `SELECT  c.id as CustomerId,c.firstname as Firstname,c.lastname as Lastname,c.email as Email,
    c.phonenumber as Phonenumber,c.zipcode as Zipcode,city_master.city_name as City,
    state_master.state_name as State,c.created_at as Created,c.updated_at as Updated
    FROM customer_master as c
    LEFT JOIN city_master ON c.city_id = city_master.city_id
    LEFT JOIN state_master ON c.state_id = state_master.state_id
    WHERE c.is_delete = ?`;
            const [result] = yield connection_1.default.execute(getCustomers, [customerStatus]);
            return result; //return array
        }
        catch (error) {
            throw error;
        }
    });
}
exports.getCustomersQuery = getCustomersQuery;
function checkCustomerExistQuery(customerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const checkCustomer = `SELECT  c.id,c.firstname,c.lastname,c.email,c.phonenumber,c.address,c.zipcode,city_master.city_name as city,state_master.state_name as state 
    FROM customer_master as c
    LEFT JOIN city_master ON c.city_id = city_master.city_id
    LEFT JOIN state_master ON c.state_id = state_master.state_id
    WHERE id=?;`;
            const [result] = yield connection_1.default.execute(checkCustomer, [
                customerId,
            ]);
            return result;
        }
        catch (error) {
            (0, logs_1.logError)('Check customer: ' + error);
            throw error;
        }
    });
}
exports.checkCustomerExistQuery = checkCustomerExistQuery;
function updateCustomerQuery(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerId = body.customerId;
            const customerArray = yield checkCustomerExistQuery(customerId);
            if (customerArray.length === 0) {
                return false;
            }
            else {
                const updateCustomer = `UPDATE customer_master SET firstname = ?, lastname=?, email=?,phonenumber=?,address=?,zipcode=?,city_id=?,state_id=? WHERE id=?;`;
                const [result] = yield connection_1.default.execute(updateCustomer, [
                    body.firstname,
                    body.lastname,
                    body.email,
                    body.phonenumber,
                    body.address,
                    body.zipcode,
                    body.city,
                    body.state,
                    customerId,
                ]);
                return true;
            }
        }
        catch (error) {
            (0, logs_1.logError)('Update Customer: ' + error);
            throw error;
        }
    });
}
exports.updateCustomerQuery = updateCustomerQuery;
function deleteCustomerQuery(customerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleteCustomer = `UPDATE customer_master SET is_delete=1 WHERE id=?`;
            const [result] = yield connection_1.default.execute(deleteCustomer, [
                customerId,
            ]);
            return result;
        }
        catch (error) {
            (0, logs_1.logError)('Delete Customer: ' + error);
            throw error;
        }
    });
}
exports.deleteCustomerQuery = deleteCustomerQuery;
function reactivateCustomerQuery(customerId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reactivateCustomer = `UPDATE customer_master SET is_delete=0 WHERE id=?`;
            const [result] = yield connection_1.default.execute(reactivateCustomer, [customerId]);
            return result;
        }
        catch (error) {
            // logError("Reactivate Customer: " + error);
            throw error;
        }
    });
}
exports.reactivateCustomerQuery = reactivateCustomerQuery;
