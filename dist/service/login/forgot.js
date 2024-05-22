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
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const connection_1 = __importDefault(require("../../config/connection"));
const forgotPassService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcrypt_1.default.hash(body.new_pass, saltRounds);
        const sql0 = `update users set expiry=?, status=?,password=? where email=?`;
        const [ans] = yield connection_1.default.execute(sql0, [
            new Date(),
            6,
            hash,
            body.email,
        ]);
        return ans;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.default = forgotPassService;
