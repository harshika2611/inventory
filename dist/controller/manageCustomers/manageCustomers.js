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
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactivateCustomer = exports.deleteCustomer = exports.getParticularCustomer = exports.getAllCustomers = exports.getCustomersPage = exports.updateCustomer = exports.insertCustomer = void 0;
const logs_1 = require("../../logs");
const manageCustomers_1 = require("../../service/manageCustomers/manageCustomers");
const commonFunctions_1 = require("../../service/commonFunctions/commonFunctions");
function insertCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            /**if this will send from frontend js then form data
             * either post request then key value pair key is name in form */
            const customerDetails = req.body;
            yield (0, manageCustomers_1.insertCustomerQuery)(customerDetails);
            return res.status(200).json({ message: 'Customer Inserted' });
        }
        catch (error) {
            return res.status(500).json({ message: 'Unable to insert' });
        }
    });
}
exports.insertCustomer = insertCustomer;
function getCustomersPage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.render('manageCustomers/manageCustomers', { data: req.user });
    });
}
exports.getCustomersPage = getCustomersPage;
function getAllCustomers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerStatus = req.params.status;
            const customersDetails = yield (0, manageCustomers_1.getCustomersQuery)(customerStatus);
            return res.status(200).json(customersDetails);
        }
        catch (error) {
            //here render error page
            (0, logs_1.logError)(error);
            return res.status(404).json({ message: "Can't get customers" });
        }
    });
}
exports.getAllCustomers = getAllCustomers;
function getParticularCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryString = req.query;
            // info(queryString.customerId);
            if (!queryString.customerId) {
                return res.redirect('/manageCustomers');
            }
            const customerDetail = yield (0, manageCustomers_1.checkCustomerExistQuery)(queryString.customerId);
            if (customerDetail.length !== 0) {
                return res.status(200).json(customerDetail);
            }
            else {
                return res.status(404).json({ message: 'Something Went Wrong' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Something Went Wrong' });
        }
    });
}
exports.getParticularCustomer = getParticularCustomer;
function updateCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerDetails = req.body;
            const cityStateIdArray = yield (0, commonFunctions_1.getCityStateId)(customerDetails.state, customerDetails.city);
            //----city, state id store
            let cityId = cityStateIdArray[0].city_id;
            let stateId = cityStateIdArray[0].state_id;
            customerDetails.city = cityId.toString();
            customerDetails.state = stateId.toString();
            const updateCustomerStatus = yield (0, manageCustomers_1.updateCustomerQuery)(customerDetails);
            if (updateCustomerStatus) {
                return res.status(200).json({ message: 'Customer Updated' });
            }
            else {
                return res.status(404).json({ message: 'Something went wrong' }); //customer not exist
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Unable to update' });
        }
    });
}
exports.updateCustomer = updateCustomer;
function deleteCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerId = req.query.customerId;
            if (!customerId) {
                return res.redirect('/manageCustomers');
            }
            const responseObject = yield (0, manageCustomers_1.deleteCustomerQuery)(customerId);
            if (responseObject.affectedRows > 0) {
                return res.status(200).json({ message: 'Customer Deleted' });
            }
            else {
                return res.status(404).json({ message: 'Something Went Wrong' });
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Unable to delete' });
        }
    });
}
exports.deleteCustomer = deleteCustomer;
function reactivateCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customerId = req.query.customerId;
            if (!customerId) {
                return res.redirect('/manageCustomers');
            }
            const responseObject = yield (0, manageCustomers_1.reactivateCustomerQuery)(customerId);
            if (responseObject.affectedRows > 0) {
                return res.status(200).json({ message: 'Customer Reactivate' });
            }
            else {
                return res.status(404).json({ message: 'Something Went Wrong' });
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Unable to reactivate' });
        }
    });
}
exports.reactivateCustomer = reactivateCustomer;
