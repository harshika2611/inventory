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
exports.getApiproductPurchasereport = exports.getpurchaseReport = void 0;
const logs_1 = require("../../logs");
const purchaseReportService_1 = __importDefault(require("../../service/report/purchaseReportService"));
const getpurchaseReport = (req, res) => {
    res.render('reports/purchaseReport', { data: req.user });
};
exports.getpurchaseReport = getpurchaseReport;
const getApiproductPurchasereport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let storage = req.user.storageId;
        const [rows] = yield (0, purchaseReportService_1.default)(storage);
        res.json(rows);
    }
    catch (err) {
        (0, logs_1.logError)(err);
    }
});
exports.getApiproductPurchasereport = getApiproductPurchasereport;
