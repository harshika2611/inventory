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
const connection_1 = __importDefault(require("../config/connection"));
const logs_1 = require("../logs");
function getCombos(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [results] = yield connection_1.default.execute(`
        SELECT
            s.id, o.id as opt_id, o.value ,o.is_delete
        FROM
            select_master AS s
                INNER JOIN
            option_master AS o ON s.id = o.select_id
        WHERE
            s.key LIKE ? AND o.is_delete = 0
    `, [name]);
            // console.log(results);
            return results;
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return [];
        }
    });
}
exports.default = getCombos;
