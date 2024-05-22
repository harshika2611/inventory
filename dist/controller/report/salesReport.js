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
exports.getApicategoryreport = exports.getApiproductreport = exports.getReportallProducts = exports.getsalesReport = void 0;
const logs_1 = require("../../logs");
const selesReportService_1 = require("../../service/report/selesReportService");
const getsalesReport = (req, res) => {
    res.render('reports/salesReport', { data: req.user });
};
exports.getsalesReport = getsalesReport;
const getReportallProducts = (req, res) => {
    res.render('reports/allProducts', { data: req.user });
};
exports.getReportallProducts = getReportallProducts;
const getApiproductreport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let storage = req.user.storageId;
        const [rows] = yield (0, selesReportService_1.getProductreport)(storage);
        res.json(rows);
    }
    catch (err) {
        (0, logs_1.logError)(err);
    }
});
exports.getApiproductreport = getApiproductreport;
const getApicategoryreport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let storage = req.user.storageId;
        const [rows] = yield (0, selesReportService_1.getCategotyreport)(storage);
        res.json(rows);
    }
    catch (err) {
        (0, logs_1.logError)(err);
    }
});
exports.getApicategoryreport = getApicategoryreport;
