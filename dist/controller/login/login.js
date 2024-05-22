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
exports.refreshToken = exports.getLink = exports.logUnsuccessService = exports.logsService = exports.getLogin = exports.userLogin = exports.getUserName = exports.checkUser = exports.userLogout = exports.checkLogin = void 0;
const login_1 = require("../../service/login/login");
Object.defineProperty(exports, "logsService", { enumerable: true, get: function () { return login_1.logsService; } });
Object.defineProperty(exports, "logUnsuccessService", { enumerable: true, get: function () { return login_1.logUnsuccessService; } });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logs_1 = require("../../logs");
const { SECRET_KEY } = process.env;
const checkLogin = (req, res) => {
    var _a;
    try {
        let flag = false;
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (token) {
            const data = jsonwebtoken_1.default.verify(token, SECRET_KEY);
            flag = true;
            res.json(flag);
            return;
        }
        else {
            flag = false;
            res.json(flag);
            return;
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
    }
};
exports.checkLogin = checkLogin;
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('login/login');
});
exports.getLogin = getLogin;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield (0, login_1.userLoginService)(data);
    if (user.length > 0 && user[0].status == 6) {
        const result = yield bcrypt_1.default.compare(req.body.password, user[0].password);
        const expireDatePass = new Date(user[0].expiry);
        const newDatePass = new Date();
        if (user[0].role_id == 4) {
            if (result) {
                if (Math.abs((newDatePass.valueOf() - expireDatePass.valueOf()) /
                    1000 /
                    3600 /
                    24) < 10) {
                    const userId = user[0].id;
                    const roleId = user[0].role_id;
                    const storageId = user[0].storage_id;
                    const token = jsonwebtoken_1.default.sign({
                        id: userId,
                        roleId: roleId,
                        storageId: storageId,
                        dp: user[0].dp,
                    }, SECRET_KEY, {
                        expiresIn: '2h',
                    });
                    const id = user[0].id;
                    const logs = yield (0, login_1.logsService)(id);
                    return res.cookie('token', token).status(200).send('login success');
                }
                else {
                    return res.status(403).send('password was expired');
                }
            }
            else {
                const id = user[0].id;
                const log = yield (0, login_1.logUnsuccessService)(id);
                return res.status(401).send('invalid email or password');
            }
        }
        if (user[0].role_id == 5 && user[0].is_delete == 0) {
            if (result) {
                if (Math.abs((newDatePass.valueOf() - expireDatePass.valueOf()) /
                    1000 /
                    3600 /
                    24) < 10) {
                    const userId = user[0].id;
                    const roleId = user[0].role_id;
                    const storageId = user[0].storage_id;
                    const token = jsonwebtoken_1.default.sign({
                        id: userId,
                        roleId: roleId,
                        storageId: storageId,
                        dp: user[0].dp,
                    }, SECRET_KEY, {
                        expiresIn: '2h',
                    });
                    return res.cookie('token', token).status(200).send('login success');
                }
                else {
                    return res.status(403).send('password was expired');
                }
            }
        }
        else {
            return res.status(402).send('no logner available');
        }
    }
    else {
        return res.status(401).send('invalid email or password');
    }
});
exports.userLogin = userLogin;
const getUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('login/user');
});
exports.getUserName = getUserName;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = JSON.parse(JSON.stringify(req.body));
        const result4 = yield (0, login_1.checkUserService)(userEmail);
        if (result4.length > 0) {
            if (result4[0].email == req.body.email) {
                let otp = Math.floor(Math.random() * 1000000000000 + 1);
                const user = yield (0, login_1.userService)(otp, req.body);
                res.render('login/user', { otp: otp, id: result4[0].id });
            }
        }
        else if (result4.length === 0) {
            const error = 'user not valid';
            res.render('login/user', { error: error });
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.checkUser = checkUser;
const getLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { link, id } = req.params;
        const expiredata = { link, id };
        if (id && link) {
            const user = yield (0, login_1.expireService)(expiredata);
            const timer = (_a = user[0][0]) === null || _a === void 0 ? void 0 : _a.updated_at;
            if (timer) {
                const expeireTimer = new Date(new Date(timer).getTime() + 5 * 3600000).toTimeString();
                const newtime = new Date().toTimeString();
                if (newtime < expeireTimer) {
                    return res.render('login/forgot');
                }
                else {
                    let otp = Math.floor(Math.random() * 1000000000000 + 1);
                    const data = { otp, id };
                    const change = yield (0, login_1.checkExpireService)(data);
                    return res.send('expired');
                }
            }
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.getLink = getLink;
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = req.cookies) === null || _b === void 0 ? void 0 : _b.token;
        return res.clearCookie('token').status(200).redirect(`/`);
    }
    catch (error) {
        (0, logs_1.logError)(error);
        res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.userLogout = userLogout;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        let token = (_c = req.cookies) === null || _c === void 0 ? void 0 : _c.token;
        const data = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        if (typeof data !== 'string') {
            const user = yield (0, login_1.getDp)(data.id);
            token = jsonwebtoken_1.default.sign({
                id: data.id,
                roleId: data.roleId,
                storageId: data.storageId,
                dp: user[0].dp,
            }, SECRET_KEY, {
                expiresIn: '2h',
            });
        }
        return res.cookie('token', token).status(200).redirect('/');
    }
    catch (error) {
        res.status(500);
        (0, logs_1.logError)(error);
    }
});
exports.refreshToken = refreshToken;
