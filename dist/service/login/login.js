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
exports.getDp = exports.logUnsuccessService = exports.logsService = exports.userLoginService = exports.checkUserService = exports.userService = exports.expireService = exports.checkExpireService = void 0;
const connection_1 = __importDefault(require("../../config/connection"));
const logs_1 = require("../../logs");
const userLoginService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql0 = `SELECT 
    users.id, email, password, created_at, status, role_id, expiry,storage_id,manager_details.is_delete, users.img_path as \`dp\`
FROM
    users
       LEFT JOIN
    manager_details ON users.id = manager_details.user_id
WHERE
    email =?`;
        const [result] = yield connection_1.default.execute(sql0, [body.email]);
        return result;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.userLoginService = userLoginService;
const getDp = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql0 = `SELECT 
        users.img_path as \`dp\`
    FROM
        users
    WHERE
        id =?`;
        const [result] = yield connection_1.default.execute(sql0, [id]);
        return result;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.getDp = getDp;
const logsService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql1 = `insert into logs(user_id,type_id)
    values (?,?)`;
        const [result1] = yield connection_1.default.execute(sql1, [id, 12]);
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.logsService = logsService;
const logUnsuccessService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql2 = `insert into logs(user_id,type_id)
    values (?,?)`;
        const [result1] = yield connection_1.default.execute(sql2, [id, 13]);
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.logUnsuccessService = logUnsuccessService;
const checkUserService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (body === null || body === void 0 ? void 0 : body.email) {
            const sql4 = `select email,id from users where email=?`;
            const [result4] = yield connection_1.default.execute(sql4, [body.email]);
            console.log(result4);
            return result4;
        }
        else {
            const sql4 = `select email from users where unique_code=? and id=?`;
            const [result4] = yield connection_1.default.execute(sql4, [
                body === null || body === void 0 ? void 0 : body.link,
                body === null || body === void 0 ? void 0 : body.userId,
            ]);
            yield connection_1.default.execute(`update users set unique_code = NULL where id = ?`, [body === null || body === void 0 ? void 0 : body.userId]);
            return result4;
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.checkUserService = checkUserService;
const userService = (otp, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql5 = `update users set unique_code=? where email=?`;
        const [result5] = yield connection_1.default.execute(sql5, [
            otp,
            body.email,
        ]);
        return result5;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.userService = userService;
const expireService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql6 = `select updated_at from users where unique_code=? and id = ?`;
        const [result6] = yield connection_1.default.execute(sql6, [
            data.link,
            data.id,
        ]);
        return result6;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.expireService = expireService;
const checkExpireService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `update users set unique_code=? where id=?`;
        const [result] = yield connection_1.default.execute(sql, [data.otp, data.id]);
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.checkExpireService = checkExpireService;
