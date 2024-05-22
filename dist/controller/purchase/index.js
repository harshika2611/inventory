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
exports.deletePurchase = exports.showPurchaseOrders = exports.fetchPurchases = exports.checkValidation = exports.deleteProductPurchase = exports.updateProductPurchase = exports.updatePurchase = exports.fetchOrderDetails = exports.createProductPurchase = exports.fetchWarehouses = exports.fetchProducts = exports.fetchSuppliers = exports.fetchCombos = exports.createPurchase = exports.showPurchaseOrder = exports.purchaseValidations = void 0;
const purchase_1 = require("../../service/purchase");
const helper_1 = __importDefault(require("../../service/helper"));
const patterns = {
    textOnly: '^[a-zA-Z\\s]+$',
    numberOnly: '^\\d+$',
    email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    date: '^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$',
};
// Pattern Field is optional
const purchaseValidations = {
    form1: {
        name: {
            required: false,
            pattern: patterns.textOnly,
        },
        date: {
            required: true,
            pattern: patterns.date,
            validator: (d) => {
                if (new Date(d) <= new Date())
                    return true;
                return false;
            },
        },
        storage_id: {
            requried: true,
            pattern: patterns.numberOnly,
        },
        supplier_id: {
            required: true,
            pattern: patterns.numberOnly,
        },
        payment_status: {
            required: false,
            pattern: patterns.numberOnly,
        },
    },
    form2: {
        product_id: {
            required: true,
            pattern: patterns.numberOnly,
        },
        unit_price: {
            required: true,
            pattern: patterns.numberOnly,
            validator: (value) => {
                if (value >= 1 && value <= 9999999)
                    return true;
                return false;
            },
        },
        quantity: {
            required: true,
            pattern: patterns.numberOnly,
            validator: (value) => {
                if (value >= 1 && value <= 9999999)
                    return true;
                return false;
            },
        },
        storage_id: {
            requried: true,
            pattern: patterns.numberOnly,
        },
    },
};
exports.purchaseValidations = purchaseValidations;
function fetchCombos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield (0, helper_1.default)(req.params.name));
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.fetchCombos = fetchCombos;
function fetchSuppliers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield (0, purchase_1.getAllSuppliers)());
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.fetchSuppliers = fetchSuppliers;
function fetchProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (Number(req.params.id))
                res.json(yield (0, purchase_1.getProductsByCategory)(req.params.id));
            else
                res.json({});
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.fetchProducts = fetchProducts;
function fetchWarehouses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield (0, purchase_1.getAllWarehouses)());
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.fetchWarehouses = fetchWarehouses;
function fetchOrderDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const finalResponse = {};
            const response = yield (0, purchase_1.fetchPurchaseOrder)({
                id: req.params.id,
            });
            if (response.length > 0) {
                finalResponse.purchaseId = response[0].id;
                finalResponse.purchaseName = response[0].name;
                finalResponse.date = response[0].date;
                finalResponse.supplierId = response[0].supplier_id;
                finalResponse.amount = response[0].amount;
                finalResponse.paymentStatus = response[0].payment_status;
                finalResponse.storageId = response[0].storage_id;
                finalResponse.products = [];
                response.forEach((obj) => {
                    obj.product_purchase_id &&
                        finalResponse.products.push({
                            categoryId: obj.category_id,
                            purchaseProductId: obj.product_purchase_id,
                            productId: obj.product_id,
                            unitPrice: obj.unit_price,
                            quantity: obj.quantity,
                        });
                });
            }
            res.json(finalResponse);
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.fetchOrderDetails = fetchOrderDetails;
function fetchPurchases(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = new URLSearchParams(req === null || req === void 0 ? void 0 : req.query);
            const field = query.get('key') || 'fname';
            const order = query.get('value') || 'asc';
            const payment_status = query.get('payment') || '10';
            const storage_id = req.user.storageId || query.get('storage') || 1;
            const response = yield (0, purchase_1.fetchPurchaseOrders)({
                field,
                order,
                storage_id,
                payment_status,
            });
            res.json(response);
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.fetchPurchases = fetchPurchases;
function showPurchaseOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('purchase', { data: req.user });
    });
}
exports.showPurchaseOrder = showPurchaseOrder;
function showPurchaseOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.render('purchase/history', { data: req.user });
    });
}
exports.showPurchaseOrders = showPurchaseOrders;
function createPurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            res.json(yield (0, purchase_1.createPurchaseOrder)(Object.assign(Object.assign({}, req.body), (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.storageId) ? { storage_id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.storageId } : {}))));
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.createPurchase = createPurchase;
function updatePurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield (0, purchase_1.updatePurchaseOrder)(Object.assign(Object.assign({}, req.body), { id: req.params.id })));
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.updatePurchase = updatePurchase;
function createProductPurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            res.json(yield (0, purchase_1.addProductInPurchaseOrder)(Object.assign(Object.assign({}, req.body), (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.storageId) ? { storage_id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.storageId } : {}))));
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.createProductPurchase = createProductPurchase;
function updateProductPurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            res.json(yield (0, purchase_1.updateProductInPurchaseOrder)(Object.assign(Object.assign(Object.assign({}, req.body), { id: req.params.id }), (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.storageId) ? { storage_id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.storageId } : {}))));
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.updateProductPurchase = updateProductPurchase;
function deleteProductPurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            res.json(yield (0, purchase_1.deleteProductFromPurchaseOrder)(Object.assign({ id: req.params.id }, (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.storageId)
                ? { storage_id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.storageId }
                : { storage_id: req.params.storageId }))));
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.deleteProductPurchase = deleteProductPurchase;
function deletePurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.json(yield (0, purchase_1.deletePurchaseOrder)({
                id: req.params.id,
            }));
        }
        catch (error) {
            res.json({ error });
        }
    });
}
exports.deletePurchase = deletePurchase;
function checkValidation(validation) {
    return (req, res, next) => {
        var _a;
        for (let arr of Object.entries(validation)) {
            const field = arr[0];
            const obj = arr[1];
            const value = (_a = req.body[field]) === null || _a === void 0 ? void 0 : _a.trim();
            if (obj.required) {
                if (!value) {
                    res.json({
                        status: 'error',
                        message: `${field} is required!`,
                        field,
                    });
                    return false;
                }
            }
            // Note pattern is optional property
            if ((obj === null || obj === void 0 ? void 0 : obj.pattern) && value) {
                if (!new RegExp(obj.pattern, 'i').test(value)) {
                    res.json({
                        status: 'error',
                        message: `Invalid input for ${field}!`,
                        field,
                    });
                    return false;
                }
            }
            if ((obj === null || obj === void 0 ? void 0 : obj.validator) && !(obj === null || obj === void 0 ? void 0 : obj.validator(value))) {
                res.json({
                    status: 'error',
                    message: `Invalid input for ${field}!`,
                    field,
                });
                return false;
            }
        }
        next();
    };
}
exports.checkValidation = checkValidation;
