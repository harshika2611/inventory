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
exports.getApiproductStock = exports.dashboard = void 0;
const logs_1 = require("../../logs");
const dashboard_1 = __importDefault(require("../../service/dashboard/dashboard"));
function dashboard(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('dashboard/dashboard', { data: req.user });
    });
}
exports.dashboard = dashboard;
const getApiproductStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let storage = req.user.storageId;
        const [rows] = yield (0, dashboard_1.default)(storage);
        res.json(rows);
    }
    catch (err) {
        (0, logs_1.logError)(err);
    }
});
exports.getApiproductStock = getApiproductStock;
