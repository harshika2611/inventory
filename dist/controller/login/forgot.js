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
exports.forgotPass = exports.getForgot = void 0;
const logs_1 = require("../../logs");
const forgot_1 = __importDefault(require("../../service/login/forgot"));
const login_1 = require("../../service/login/login");
const getForgot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('login/forgot');
});
exports.getForgot = getForgot;
const forgotPass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const link = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.link;
        const userId = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
        const { new_pass } = req.body;
        const result4 = yield (0, login_1.checkUserService)(Object.assign(Object.assign({}, req.body), { link, userId }));
        const email = result4[0].email;
        if (result4.length > 0) {
            const data = { new_pass, email };
            const result = yield (0, forgot_1.default)(data);
        }
        if (result4.length === 0) {
            const error = 'user not valid';
            return res.status(404).send('User not valid');
        }
        else {
            return res.status(200).send('You are successfully registerd');
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.forgotPass = forgotPass;
