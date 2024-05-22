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
exports.getAllCityState = exports.getCityStateId = exports.getCityQuery = exports.getStateQuery = void 0;
const connection_1 = __importDefault(require("../../config/connection"));
const logs_1 = require("../../logs");
//async function always return promise
function getStateQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getStateQuery = `SELECT * FROM state_master;`;
            //array destructuring
            /**If does not want to write [result] then in this return result[0]
             * because in this response we get array that have two nested array element
             * first one is data
             * second one is schema of that table
             */
            const [result] = yield connection_1.default.execute(getStateQuery);
            // info(result);
            return result;
        }
        catch (error) {
            (0, logs_1.logError)('Get State: ' + error);
            throw error;
            // return [];
        }
    });
}
exports.getStateQuery = getStateQuery;
function getCityQuery(stateName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getStateQuery = `SELECT * FROM city_master as c 
    LEFT JOIN state_master as s ON c.state_id=s.state_id 
    WHERE state_name=?`;
            const [result] = yield connection_1.default.execute(getStateQuery, [
                stateName,
            ]);
            return result;
        }
        catch (error) {
            (0, logs_1.logError)('Get City: ' + error);
            throw error;
            // return [];
        }
    });
}
exports.getCityQuery = getCityQuery;
function getCityStateId(stateName, cityName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getCityStateIdQuery = `SELECT s.state_id as state_id,c.city_id as city_id FROM state_master as s
    LEFT JOIN city_master as c ON s.state_id = c.state_id
    WHERE s.state_name=? AND c.city_name=?`;
            const [result] = yield connection_1.default.execute(getCityStateIdQuery, [stateName, cityName]);
            // info(result);
            return result;
        }
        catch (error) {
            (0, logs_1.logError)('Get State and City Id: ' + error);
            throw error; //rethrow
            // return [];
        }
    });
}
exports.getCityStateId = getCityStateId;
function getAllCityState() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getAllCityStateIdQuery = `SELECT s.state_id as state_id,s.state_name as state_name,c.city_id as city_id, c.city_name as city_name FROM state_master as s
    LEFT JOIN city_master as c ON s.state_id = c.state_id`;
            const [result] = yield connection_1.default.execute(getAllCityStateIdQuery);
            // info(result);
            return result;
        }
        catch (error) {
            (0, logs_1.logError)('Get All State and City: ' + error);
            throw error; //rethrow
            // return [];
        }
    });
}
exports.getAllCityState = getAllCityState;
