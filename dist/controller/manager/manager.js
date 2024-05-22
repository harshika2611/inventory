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
exports.getPerticularManager = exports.updateManager = exports.listManagers = exports.getManager = exports.manageManager = exports.getStoreCombo = exports.deleteManager = exports.getCityCombo = void 0;
const logs_1 = require("../../logs");
const manager_1 = require("../../service/manager/manager");
const getCityCombo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, manager_1.cityComboService)();
        if (result.length === 0) {
            return res.status(404).json({ message: 'Something Went Wrong' });
        }
        else {
            return res.status(200).json({ result: result });
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.getCityCombo = getCityCombo;
const getStoreCombo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, manager_1.storeComboServices)(id);
        if (result.length === 0) {
            return res.status(404).json({ message: 'data not found' });
        }
        else {
            return res.status(200).json({ result: result });
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.getStoreCombo = getStoreCombo;
const getManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('manager/manager', { data: req.user });
});
exports.getManager = getManager;
// declare global {
//   namespace Express {
//     interface User {
//       id: number;
//       roleId: number;
//       storageId: number | null;
//       dp: File | null;
//     }
//   }
// }
const manageManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manager = req.body;
        const result1 = yield (0, manager_1.checkManagerService)(manager);
        if (result1.length) {
            return res.status(409).send('already exist');
        }
        else {
            try {
                const otp = Math.floor(Math.random() * 1000000000000 + 1);
                const result2 = yield (0, manager_1.insertManagerService)(otp, manager);
                const managerDetails = yield (0, manager_1.insertManagerDetail)(result2, manager);
                return res.status(200).send('manager add');
            }
            catch (error) {
                (0, logs_1.logError)(error);
                return res.status(500).json({ message: 'can`t fetch user controller' });
            }
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.manageManager = manageManager;
const listManagers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let status = req.query.status || 'Active';
        let order = req.query.order || 'asc';
        let field = req.query.field || 'id';
        const result = yield (0, manager_1.listManagersService)(status, order, field);
        return res.status(200).json(result);
    }
    catch (error) {
        (0, logs_1.logError)(error);
        return res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.listManagers = listManagers;
const updateManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const checkManger = await checkUpdateManagerService(req.body);
        // if (checkManger.length) {
        //   return res.status(409).send('already exist');
        // } else {
        try {
            // const changeEmail = await changeEmailService(req.body);
            const updateManager = req.body;
            const otp = Math.floor(Math.random() * 1000000000000 + 1);
            const result1 = yield (0, manager_1.updateManagerService)(otp, updateManager);
            return res.status(200).send('manager add');
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return res.status(500).json({ message: 'can`t fetch user controller' });
        }
        // }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        return res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.updateManager = updateManager;
const getPerticularManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const manager = yield (0, manager_1.getPerticularManagerService)(id);
        if (manager.length !== 0) {
            return res.status(200).json(manager);
        }
        else {
            return res.status(404).json({ message: 'Manager not found' });
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.getPerticularManager = getPerticularManager;
const deleteManager = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, manager_1.deleteManagerService)(id);
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Manager is deleted' });
        }
        else {
            return res.status(404).json({ message: 'error' });
        }
    }
    catch (error) {
        (0, logs_1.logError)(error);
        res.status(500).json({ message: 'can`t fetch user controller' });
    }
});
exports.deleteManager = deleteManager;
