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
exports.insertManagerService = exports.updateManagerService = exports.listManagersService = exports.checkManagerService = exports.insertManagerDetail = exports.storeComboServices = exports.getPerticularManagerService = exports.deleteManagerService = exports.cityComboService = void 0;
const logs_1 = require("../../logs");
const connection_1 = __importDefault(require("../../config/connection"));
const saltRounds = 10;
const cityComboService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `SELECT DISTINCT
    city_master.city_id,city_master.city_name
FROM
    storage_space_master
        JOIN
    city_master ON storage_space_master.location_id = city_master.city_id and is_delete=?;`;
        const [result] = yield connection_1.default.execute(sql, [0]);
        return result;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.cityComboService = cityComboService;
const storeComboServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql4 = `SELECT DISTINCT
    storage_space_master.id, storage_space_master.name
FROM
    storage_space_master
        JOIN
    city_master ON storage_space_master.location_id = city_master.city_id where city_master.city_id=? and is_delete=?`;
        const [result4] = yield connection_1.default.execute(sql4, [id, 0]);
        return result4;
    }
    catch (error) {
        console.log(error);
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.storeComboServices = storeComboServices;
const listManagersService = (status, order, field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql0 = `SELECT 
    users.id,
    firstname AS Firstname,
    lastname AS Lastname,
    email AS Email,
    name AS Place,
    city_name AS Location,
    option_master.value as Status,
    date(users.created_at) as Created,
    users.updated_at AS Updated
FROM
    users
        JOIN
    manager_details ON users.id = manager_details.user_id
        JOIN
    storage_space_master ON storage_space_master.id = manager_details.storage_id
        JOIN
    city_master ON city_master.city_id = storage_space_master.location_id
        JOIN
    option_master ON option_master.id = users.status
WHERE
  option_master.key =?
        AND manager_details.is_delete = ?
ORDER BY ${field} ${order}`;
        const [ans] = yield connection_1.default.execute(sql0, [status, 0]);
        return ans;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.listManagersService = listManagersService;
const getPerticularManagerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql1 = `SELECT 
    users.id,
    firstname,
    lastname,
    email,
    name ,
    storage_space_master.id as location,
    city_id,
    city_name,
    users.created_at AS Created,
    users.updated_at AS Updated
FROM
    users
        JOIN
    manager_details ON users.id = manager_details.user_id
        JOIN
    storage_space_master ON storage_space_master.id = manager_details.storage_id
        JOIN
    city_master ON city_master.city_id = storage_space_master.location_id
WHERE
    status = ?
        AND manager_details.is_delete = ?
        AND users.id = ?;`;
        const [ans1] = yield connection_1.default.execute(sql1, [6, 0, id]);
        return ans1;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.getPerticularManagerService = getPerticularManagerService;
// const checkUpdateManagerService = async (body) => {
//   try {
//     const sql0 = `select email from users where email=? and id != ?`;
//     const [result] = await connection.execute(sql0, [body.email, body.id]);
//     return result;
//   } catch (error) {
//     logError( error);
//     throw error;
//   }
// };
const updateManagerService = (otp, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(body);
        const sql1 = `update users set firstname=?,lastname=? where id=?;`;
        const [result] = yield connection_1.default.execute(sql1, [
            body.firstname,
            body.lastname,
            body.id,
        ]);
        return result;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.updateManagerService = updateManagerService;
const checkManagerService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql0 = `select email from users where email=?`;
        const [result] = yield connection_1.default.execute(sql0, [body.email]);
        return result;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.checkManagerService = checkManagerService;
const insertManagerService = (otp, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql2 = `insert into users (role_id,firstname,lastname,email,unique_code,expiry,status)
		values (?,?,?,?,?,?,?)`;
        const [ans1] = yield connection_1.default.execute(sql2, [
            5,
            body.firstname,
            body.lastname,
            body.email,
            otp,
            new Date(),
            7,
        ]);
        return ans1.insertId;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.insertManagerService = insertManagerService;
const insertManagerDetail = (result2, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql3 = `INSERT INTO manager_details (user_id,storage_id)
		values(?,?)`;
        const [ans2] = yield connection_1.default.execute(sql3, [
            result2,
            body.place,
        ]);
        return ans2;
    }
    catch (error) {
        console.log(error);
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.insertManagerDetail = insertManagerDetail;
const deleteManagerService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql0 = `UPDATE manager_details 
   SET 
       is_delete = ?
   WHERE
      user_id = ?`;
        const [result] = yield connection_1.default.execute(sql0, [1, id]);
        return result;
    }
    catch (error) {
        (0, logs_1.logError)(error);
        throw error;
    }
});
exports.deleteManagerService = deleteManagerService;
