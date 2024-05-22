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
exports.unlinkProductPdf = exports.getCombosDetails = exports.getCity = exports.getState = void 0;
const logs_1 = require("../../logs");
const commonFunctions_1 = require("../../service/commonFunctions/commonFunctions");
const helper_1 = __importDefault(require("../../service/helper"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function getState(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stateArray = yield (0, commonFunctions_1.getStateQuery)();
            if (stateArray.length === 0) {
                return res.status(404).json({ message: 'Something Went Wrong' });
            }
            else {
                return res.status(200).json({ stateArray: stateArray });
            }
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    });
}
exports.getState = getState;
function getCity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stateName = req.body;
            const cityArray = yield (0, commonFunctions_1.getCityQuery)(stateName.state);
            if (cityArray.length === 0) {
                return res.status(404).json({ message: 'Something  Went Wrong' });
            }
            else {
                return res.status(200).json({ cityArray: cityArray });
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    });
}
exports.getCity = getCity;
function getCombosDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const name = req.body.key;
            const comboDetailsArray = yield (0, helper_1.default)(name);
            if (comboDetailsArray.length > 0) {
                return res.status(200).json(comboDetailsArray);
            }
            else {
                return res.status(404).json({ message: 'Something Went Wrong' });
            }
        }
        catch (error) {
            (0, logs_1.logError)(error);
            return res.status(500).json({ message: 'Something Went Wrong' });
        }
    });
}
exports.getCombosDetails = getCombosDetails;
//this function is use ful when user download pdf then pdf unlink
function unlinkProductPdf(pdfNameObject) {
    const pdfPath = path_1.default.join(__dirname, `../../public/uploads/${pdfNameObject.folderName}/${pdfNameObject.pdfName}`); //path of pdf
    if (fs_1.default.existsSync(pdfPath)) {
        fs_1.default.unlinkSync(pdfPath);
    }
}
exports.unlinkProductPdf = unlinkProductPdf;
