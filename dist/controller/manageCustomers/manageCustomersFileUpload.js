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
const logs_1 = require("../../logs");
const fs_1 = __importDefault(require("fs"));
const fast_csv_1 = __importDefault(require("fast-csv"));
const path = require('path');
const { getAllCityState, } = require('../../service/commonFunctions/commonFunctions.js');
const { insertCustomerFromFileQuery, } = require('../../service/manageCustomers/manageCustomers.js');
const manageCustomerValidation = require('./manageCustomerFileValidation.js');
function uploadFile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let customerDetails = [];
            let dataErrorStatus = false;
            if (req.fileError) {
                return res.status(400).json({ message: 'Please Upload CSV File' });
            }
            // logger.info(req.file.filename);
            let filePath = path.join(__dirname, `../../public/uploads/csvFiles/${req.file.filename}`);
            /**first check file exist in folder or not it is extra handle if file upload in folder then this execute
             * second we read csv file each row we got object with csv file first line is key
             */
            if (fs_1.default.existsSync(filePath)) {
                const allCityState = yield getAllCityState(); //array contain object
                fs_1.default.createReadStream(filePath)
                    .pipe(fast_csv_1.default.parse({ headers: true }))
                    .on('error', (err) => {
                    logs_1.logger.logError(err);
                    return res.status(500).json({ message: 'Something Went Wrong..' });
                })
                    .on('data', (row) => __awaiter(this, void 0, void 0, function* () {
                    const dataValidationStatus = manageCustomerValidation(row);
                    if (!dataValidationStatus && !dataErrorStatus) {
                        let eachCustomerDetails = [];
                        for (let key in row) {
                            switch (key) {
                                case 'city':
                                    for (let element of allCityState) {
                                        let cityNameInDb = element.city_name;
                                        let fileCity = row.city;
                                        let stateNameInDb = element.state_name;
                                        let fileState = row.state;
                                        if (cityNameInDb.toLowerCase() === fileCity.toLowerCase() &&
                                            stateNameInDb.includes(fileState)) {
                                            eachCustomerDetails.push(Number(element.city_id));
                                            eachCustomerDetails.push(Number(element.state_id));
                                        }
                                    }
                                    break;
                                case 'state':
                                    break;
                                default:
                                    eachCustomerDetails.push(row[key]);
                            }
                        }
                        customerDetails.push(eachCustomerDetails);
                        // logger.info(eachCustomerDetails);
                    }
                    else {
                        dataErrorStatus = true;
                    }
                }))
                    .on('end', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        if (dataErrorStatus) {
                            return res
                                .status(400)
                                .json({ message: 'Invalid Data In CSV File' });
                        }
                        else {
                            const customerInsert = yield insertCustomerFromFileQuery(customerDetails);
                            return res
                                .status(200)
                                .json({ message: 'Inserted', filePath: req.file.filename });
                        }
                    }
                    catch (err) {
                        return res.status(500).json({ message: 'Something Went Wrong..' });
                    }
                }));
            }
            else {
                throw new Error('Something Went Wrong..');
            }
        }
        catch (error) {
            logs_1.logger.info('Customer File Upload:' + error);
            return res.status(500).json({ message: error.message });
        }
    });
}
module.exports = { uploadFile };
