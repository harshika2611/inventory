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
exports.deleteStoreProduct = exports.storeProducts = exports.filterStore = exports.getParticularStore = exports.deleteStore = exports.updateStore = exports.getStorePage = exports.getStore = exports.insertStore = exports.detailsStore = void 0;
const store_1 = require("../../service/stores/store");
function insertStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeDetails = req.body;
            // console.log(storeDetails);
            yield (0, store_1.insertStoreQuery)(storeDetails);
            return res.json({ status: 200 });
        }
        catch (error) {
            // return res.status(500).json({ message: 'Unable to insert' });
        }
    });
}
exports.insertStore = insertStore;
function getStorePage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('stores/store', { data: req.user });
    });
}
exports.getStorePage = getStorePage;
function getStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeDetails = yield (0, store_1.getStoreQuery)();
            return res.status(200).json(storeDetails);
        }
        catch (error) {
            return res.status(404).json({ message: "Can't get stores" });
        }
    });
}
exports.getStore = getStore;
function getParticularStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const queryString = req.query;
            // logger.info(queryString.customerId);
            const storeDetail = yield (0, store_1.checkStoreExistQuery)(queryString.storeId);
            if (storeDetail.length !== 0) {
                return res.status(200).json(storeDetail);
            }
            else {
                return res.status(404).json({ message: 'Store Not Found' });
            }
        }
        catch (error) {
            // console.log(error)
            res.status(500).json({ message: 'Something Went Wrong' });
        }
    });
}
exports.getParticularStore = getParticularStore;
function updateStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeDetails = req.body;
            const updateStoreStatus = yield (0, store_1.updateStoreQuery)(storeDetails, storeDetails.storeId);
            if (updateStoreStatus) {
                return res.status(200).json({ message: 'Store Updated' });
            }
            else {
                return res.status(404).json({ message: 'Something went wrong' });
            }
        }
        catch (error) {
            return res.status(500).json({ message: 'Unable to update' });
        }
    });
}
exports.updateStore = updateStore;
function deleteStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeId = req.query.storeId;
            yield (0, store_1.deleteStoreQuery)(storeId);
            // window.location.reload('/store');
        }
        catch (error) {
            return res.status(500).json({ message: 'Unable to delete' });
        }
    });
}
exports.deleteStore = deleteStore;
function deleteStoreProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const storeId = req.query.storeId;
            const productId = req.query.productId;
            yield (0, store_1.deleteStoreProductQuery)(storeId, productId);
        }
        catch (error) {
            return res.status(500).json({ message: 'Unable to delete' });
        }
    });
}
exports.deleteStoreProduct = deleteStoreProduct;
function filterStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (error) { }
    });
}
exports.filterStore = filterStore;
function storeProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const storeId = req.query.id;
        const storeDetails = yield (0, store_1.storeProductQuery)(storeId);
        return res.json(storeDetails);
    });
}
exports.storeProducts = storeProducts;
function detailsStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.user;
        res.render('stores/warehouseDetails', { data });
    });
}
exports.detailsStore = detailsStore;
