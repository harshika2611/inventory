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
exports.cookieExtractor = exports.auth = void 0;
const connection_1 = __importDefault(require("../config/connection"));
const logs_1 = require("../logs");
const passport_jwt_1 = require("passport-jwt");
const { SECRET_KEY } = process.env;
let cookieExtractor = function (req) {
    var _a;
    return (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
};
exports.cookieExtractor = cookieExtractor;
const auth = (passport) => {
    const opt = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: SECRET_KEY || '',
    };
    passport.use(new passport_jwt_1.Strategy(opt, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const result = yield connection_1.default.execute('select id,role_id from users where id=?', [payload.id]);
            if (result.length > 0) {
                return done(payload);
            }
            return done(false);
        }
        catch (error) {
            (0, logs_1.logError)(error);
        }
    })));
};
exports.auth = auth;
