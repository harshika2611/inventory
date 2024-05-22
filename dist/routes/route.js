"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const passport_1 = __importDefault(require("passport"));
const login_1 = require("../controller/login/login");
const auth_1 = require("../middleware/auth");
(0, auth_1.auth)(passport_1.default);
const homeController_1 = __importDefault(require("../controller/home/homeController"));
const forgot_1 = require("../controller/login/forgot");
const loginValidation_1 = __importDefault(require("../middleware/login/loginValidation"));
const forgotValidation_1 = __importDefault(require("../middleware/login/forgotValidation"));
router.get('/checkLogin', login_1.checkLogin);
router.get('/', login_1.getLogin);
router.post('/', loginValidation_1.default, login_1.userLogin);
router.get('/home', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), homeController_1.default);
router.get('/user', login_1.getUserName);
router.post('/user', login_1.checkUser);
router.get('/activelink/:link/:id', login_1.getLink);
router.post('/activelink/:link/:id', forgotValidation_1.default, forgot_1.forgotPass);
router.get('/logout', passport_1.default.authenticate('jwt', { session: false }), login_1.userLogout);
//check role
const checkRole_1 = __importDefault(require("../middleware/checkRole/checkRole"));
//store with city combo
const manager_1 = require("../controller/manager/manager");
router.get('/storeCombo/:id', manager_1.getStoreCombo);
router.get('/cityCombo', manager_1.getCityCombo);
//manage manager
const manager_2 = require("../controller/manager/manager");
const managerValidation_1 = __importDefault(require("../middleware/manager/managerValidation"));
router.get('/manager', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, manager_2.getManager);
router.post('/manager', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, managerValidation_1.default, manager_2.manageManager);
router.get('/api/getmanagers', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, manager_2.listManagers);
router.get('/api/getmanager/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, manager_2.getPerticularManager);
router.post('/updatemanager', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, managerValidation_1.default, manager_2.updateManager);
router.get('/api/deleteManager/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, manager_2.deleteManager);
//----getCity and getState
const commonFunctions_1 = require("../controller/commonFunctions/commonFunctions");
router.get('/api/getState', commonFunctions_1.getState);
router.post('/api/getCity', commonFunctions_1.getCity);
//report
const salesReport_1 = require("../controller/report/salesReport");
const purchaseReport_1 = require("../controller/report/purchaseReport");
const orderReport_1 = require("../controller/report/orderReport");
const reportPdf_1 = require("../controller/report/reportPdf");
const commonFunctions_2 = require("../controller/commonFunctions/commonFunctions");
router.get('/salesReport', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), salesReport_1.getsalesReport);
router.get('/salesReportallProducts', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), salesReport_1.getReportallProducts);
router.get('/api/salesreport/allproduct', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), salesReport_1.getApiproductreport);
router.get('/api/salesreport/allcategory', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), salesReport_1.getApicategoryreport);
router.get('/purchaseReport', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchaseReport_1.getpurchaseReport);
router.get('/api/purchasereport/allproduct', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchaseReport_1.getApiproductPurchasereport);
router.get('/SalesorderDashbord', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), orderReport_1.getorderReport);
router.get('/orderProduct', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), orderReport_1.getorderProducts);
router.get('/api/orderreport/allorder', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), orderReport_1.getApiorderRreport);
router.get('/api/orderreport/allproduct', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), orderReport_1.getApiordersProductRreport);
// passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
router.post('/api/combos', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), commonFunctions_2.getCombosDetails);
// router.post('/api/pdfTemplate', generatePdf);
router.get('/reportGenerate', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), reportPdf_1.reportPdfPage);
router.post('/reportGenerate', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), reportPdf_1.productReportGenerate);
router.post('/api/outOfStockProductReport', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), reportPdf_1.outOfStockProducts);
//----Dashboard
const dashboard_1 = require("../controller/dashboard/dashboard");
router.get('/dashboard', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), dashboard_1.dashboard);
router.get('/api/productStock', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), dashboard_1.getApiproductStock);
//-------------
//----------------------------sales Module-------------------------
const { insertSalesOrder, insertSalesProduct, getSalesCustomer, getsalesOrder, updateSalesOrder, getSalesProducts, 
// getSalesCategory,
productGrid, deleteOrder, deleteProduct, updateSalesProduct, } = require('../controller/salesModule/salesControllers.js');
const salesValidation_1 = require("../middleware/salesModule/salesValidation");
const { orderHistory, newOrder, invoicePdf, invoicePdfView, } = require('../controller/salesModule/salesRender.js');
router.get('/salesorder', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), getsalesOrder);
router.post('/insertSalesOrder', salesValidation_1.orderValidation, passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), insertSalesOrder);
router.post('/insertSalesProduct', salesValidation_1.productValidation, passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), insertSalesProduct);
router.get('/getSalesProducts', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), getSalesProducts);
router.get('/getCustomers', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), getSalesCustomer);
router.post('/updateSalesOrder', salesValidation_1.orderValidation, passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), updateSalesOrder);
router.post('/updateSalesProduct', salesValidation_1.productValidation, passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), updateSalesProduct);
// router.get('/getSalesCategories', getSalesCategory);
router.get('/salesHistory', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), orderHistory);
router.get('/salesNewOrder', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), newOrder);
router.get('/getProductGrid', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), productGrid);
router.get('/deleteSalesOrder', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), deleteOrder);
router.get('/deleteSalesProduct', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), deleteProduct);
// router.get(
//   '/getPdf',
//   passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
//   invoiceGenerator
// );
router.get('/invoice', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), invoicePdf);
router.get('/salesOrderView', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), invoicePdfView);
//------------------------------------------------------
//---------Manage Customers
const manageCustomers_1 = require("../controller/manageCustomers/manageCustomers");
// const manageCustomerValidation = require('../middleware/manageCustomers/manageCustomerValidation.js');
const manageCustomerSupplierValidation = require('../../../middleware/manageCustomers/customerSupplierValidation.js');
const { uploadFile, } = require('../controller/manageCustomers/manageCustomersFileUpload.js');
const { uploadCustomerFile, } = require('../../../middleware/manageCustomers/manageCustomerFileUpload.js');
router.get('/manageCustomers', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageCustomers_1.getCustomersPage);
router.get('/api/manageCustomers/:status', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageCustomers_1.getAllCustomers);
router.get('/api/getCustomers', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageCustomers_1.getParticularCustomer);
router.post('/api/insertCustomer', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageCustomerSupplierValidation, manageCustomers_1.insertCustomer);
router.post('/api/updateCustomer', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageCustomerSupplierValidation, manageCustomers_1.updateCustomer);
router.get('/api/deleteCustomer', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageCustomers_1.deleteCustomer);
router.get('/api/reactivateCustomer', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageCustomers_1.reactivateCustomer);
router.post('/api/customersFileUpload', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), uploadCustomerFile.single('customersFile'), uploadFile);
//---------Manage Suppliers
const { insertSupplier, updateSupplier, getSuppliersPage, getAllSuppliers, getParticularSupplier, deleteSupplier, reactivateSupplier, } = require('../controller/manageSuppliers/manageSuppliers.js');
// const manageSuppliersValidation = require('../middleware/manageSuppliers/manageSuppliersValidation.js');
const { supplierUploadFile, } = require('../controller/manageSuppliers/manageSuppliersFileUpload.js');
const { uploadSupplierFile, } = require('../../../middleware/manageSuppliers/manageSupplierFileUpload.js');
router.get('/manageSuppliers', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), getSuppliersPage);
router.get('/api/manageSuppliers/:status', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), getAllSuppliers);
router.get('/api/getSuppliers', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), getParticularSupplier);
router.post('/api/insertSupplier', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageCustomerSupplierValidation, insertSupplier);
router.post('/api/updateSupplier', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageCustomerSupplierValidation, updateSupplier);
router.get('/api/deleteSupplier', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), deleteSupplier);
router.get('/api/reactivateSupplier', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), reactivateSupplier);
router.post('/api/suppliersFileUpload', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), uploadSupplierFile.single('suppliersFile'), supplierUploadFile);
// ---------Store
const store_1 = require("../controller/stores/store");
const storeValidation_1 = __importDefault(require("../middleware/store/storeValidation"));
router.get('/store', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, store_1.getStorePage);
router.get('/api/store', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, store_1.getStore);
router.get('/getStore', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, store_1.getParticularStore);
router.post('/insertStore', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, storeValidation_1.default, store_1.insertStore);
router.post('/updateStore', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, storeValidation_1.default, store_1.updateStore);
router.post('/deleteStore', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, store_1.deleteStore);
router.get('/storeProducts', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, store_1.detailsStore);
router.get('/api/storeProducts', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, store_1.storeProducts);
router.post('/deleteStoreProduct', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), checkRole_1.default, store_1.deleteStoreProduct);
// router.post('/filterStore',passport.authenticate('jwt', { session: false, failureRedirect: '/' }), filterStore);
// ------------------- Manage Purchases ---------------------- //
const purchase_1 = require("../controller/purchase");
router.get('/api/combos/:name', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.fetchCombos);
router.get('/api/purchase/suppliers', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.fetchSuppliers);
router.get('/api/purchase/products/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.fetchProducts);
router.get('/api/purchase/warehouses', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.fetchWarehouses);
router.get('/api/order/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.fetchOrderDetails);
router.post('/api/purchase/order', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), (0, purchase_1.checkValidation)(purchase_1.purchaseValidations.form1), purchase_1.createPurchase);
router.put('/api/purchase/order/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), (0, purchase_1.checkValidation)(Object.assign(Object.assign({}, purchase_1.purchaseValidations.form1), { supplier_id: { required: false }, storage_id: { requried: false } })), purchase_1.updatePurchase);
router.post('/api/purchase/product', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), (0, purchase_1.checkValidation)(purchase_1.purchaseValidations.form2), purchase_1.createProductPurchase);
router.put('/api/purchase/product/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), (0, purchase_1.checkValidation)(Object.assign(Object.assign({}, purchase_1.purchaseValidations.form2), { storage_id: { requried: false } })), purchase_1.updateProductPurchase);
router.delete('/api/purchase/product/:id/:storageId', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.deleteProductPurchase);
router.get('/api/purchases', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.fetchPurchases);
router.delete('/api/purchase/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.deletePurchase);
router.get('/purchaseOrder', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.showPurchaseOrder);
router.get('/purchaseHistory', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), purchase_1.showPurchaseOrders);
// ------------------- Manage Purchases ---------------------- //
//---------------------Products Module---------------------
const { categoryRender, categoryListing, deleteCategory, reactivateCategory, deleteMainProduct, manageProduct, manageCategory, productListing, getApiproduct, getProductDetails, getProductAllDetails, } = require('../controller/product/productListing.js');
const { productInfo, productInfoPost, productInfoValid, productValid, productView, } = require('../controller/product/productInfo.js');
const manageProductFormValidation = require('../../../middleware/product/productValidation.js');
router.get('/category', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), categoryRender);
router.post('/category', manageCategory);
router.get('/api/category/:categoryStatus', categoryListing);
router.post('/api/deleteCategory', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), deleteCategory);
router.get('/api/reactivateCategory/:categoryId', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), reactivateCategory);
router.get('/products', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), productListing);
router.post('/products', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), manageProductFormValidation, manageProduct);
router.get('/productInfo', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), productInfo);
router.get('/productView', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), productView);
router.post('/productInfo', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), productInfoValid(productValid), productInfoPost);
router.get('/api/products', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), getApiproduct);
router.get('/api/productDetails/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), getProductDetails);
router.get('/api/productAllDetails/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), getProductAllDetails);
router.get('/api/deleteProduct/:id', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), deleteMainProduct);
//---------------------Profile Module---------------------
const { viewProfile, editProfile, updateProfile, } = require('../controller/profile/profile.js');
const { userProfileStorage } = require('../../../middleware/multer/multer.js');
router.get('/profile', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), viewProfile);
router.get('/profileEdit', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), editProfile);
router.post('/profileEdit', passport_1.default.authenticate('jwt', { session: false, failureRedirect: '/' }), userProfileStorage.single('newImage'), updateProfile);
// router.post('/imageUpload',storeImage);
exports.default = router;
