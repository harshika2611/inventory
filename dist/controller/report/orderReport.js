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
exports.getApiordersProductRreport = exports.getApiorderRreport = exports.getorderProducts = exports.getorderReport = void 0;
const logger = require('../../logs');
const orderReportService_1 = require("../../service/report/orderReportService");
const getorderReport = (req, res) => {
    res.render('reports/orderReport', { data: req.user });
};
exports.getorderReport = getorderReport;
const getorderProducts = (req, res) => {
    res.render('reports/orderProduct', { data: req.user });
};
exports.getorderProducts = getorderProducts;
const getApiorderRreport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let queryLength = Object.keys(req.query).length;
        let storage = req.user.storageId;
        if (queryLength === 0) {
            const [rows] = yield (0, orderReportService_1.getOrderreport)(storage);
            res.json(rows);
        }
        else if (queryLength == 1) {
            let query = Object.keys(req.query);
            if (query[0] == 'day') {
                const [rows] = yield (0, orderReportService_1.getOrderDayreportDay)(req.query[query[0]], storage);
                res.json(rows);
            }
            else if (query[0] == 'month') {
                const [rows] = yield (0, orderReportService_1.getOrderDayreportMonth)(req.query[query[0]], storage);
                res.json(rows);
            }
        }
        else {
            let fromDate = req.query.fromDate;
            let toDate = req.query.toDate;
            const [rows] = yield (0, orderReportService_1.getOrderreportBydate)(fromDate, toDate, storage);
            res.json(rows);
        }
    }
    catch (err) {
        logger.logError(err);
    }
});
exports.getApiorderRreport = getApiorderRreport;
const getApiordersProductRreport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let id = req.query.id;
        const [rows] = yield (0, orderReportService_1.getApiordersProduct)(id);
        res.json(rows);
    }
    catch (err) {
        logger.logError(err);
    }
});
exports.getApiordersProductRreport = getApiordersProductRreport;
