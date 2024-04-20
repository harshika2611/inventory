const express = require('express');
const router = express.Router();
const multer = require('multer');

//login module
const {
  userLogout,
  checkUser,
  getUserName,
  userLogin,
  getLogin,
  getLink,
} = require('../controller/login/login');
const { getHome } = require('../controller/home/homeController');
const { auth } = require('../middleware/auth');
const { getForgot, forgotPass } = require('../controller/login/forgot');
const passport = require('passport');
router.use(passport.initialize());
auth(passport);
const { checkLogin } = require('../controller/login/login.js');
const loginFormValidation = require('../controller/login/loginValidation.js');
const forgotFormValidation = require('../controller/login/forgotValidation.js');
router.get('/checkLogin', checkLogin);
router.get('/', getLogin);
router.post('/', loginFormValidation, userLogin);
router.get(
  '/home',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getHome
);
router.get('/user', getUserName);
router.post('/user', checkUser);
router.get('/activelink/:link', getLink);
router.get('/forgot', getForgot);
router.post('/forgot', forgotFormValidation, forgotPass);
router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  userLogout
);

//----------------------

//store combo
const { getStoreCombo } = require('../controller/manager/manager.js');
router.get('/storeCombo', getStoreCombo);

//manage manager

const {
  deleteManager,
  manageManager,
  getManager,
  getPerticularManager,
  listManagers,
  updateManager,
} = require('../controller/manager/manager');
const manageManagerFormValidation = require('../controller/manager/managerValidation.js');
router.get(
  '/manager',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getManager
);
router.post(
  '/manager',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  manageManagerFormValidation,
  manageManager
);
router.get('/api/getmanagers', listManagers);
router.get('/api/getmanager/:id', getPerticularManager);
router.post('/updatemanager', manageManagerFormValidation, updateManager);
router.get('/api/deleteManager/:id', deleteManager);

//----getCity and getState
const {
  getState,
  getCity,
} = require('../controller/commonFunctions/commonFunctions.js');
getState, getCity, router.get('/api/getState', getState);
router.post('/api/getCity', getCity);

//report

const {
  getApiproductreport,
  getApicategoryreport,
  getReportallProducts,
  getsalesReport,
} = require('../controller/report/salesReport.js');
const {
  getpurchaseReport,
  getApiproductPurchasereport,
} = require('../controller/report/purchaseReport.js');
const {
  getApiorderRreport,
  getorderReport,
  getorderProducts,
  getApiordersProductRreport,
} = require('../controller/report/orderReport.js');

router.get('/salesReport', getsalesReport);
router.get('/salesReportallProducts', getReportallProducts);
router.get('/api/salesreport/allproduct', getApiproductreport);
router.get('/api/salesreport/allcategory', getApicategoryreport);

router.get('/purchaseReport', getpurchaseReport);
router.get('/api/purchasereport/allproduct', getApiproductPurchasereport);

router.get('/orderReport', getorderReport);
router.get('/orderProduct/:id', getorderProducts);
router.get('/api/orderreport/allorder', getApiorderRreport);
router.get('/api/orderreport/allproduct/:id', getApiordersProductRreport);

//----Dashboard
const {
  dashboard,
  getApiproductStock,
} = require('../controller/dashboard/dashboard.js');
router.get(
  '/dashboard',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  dashboard
);
router.get('/api/productStock', getApiproductStock);
//-------------

//----------------------------sales Module-------------------------

const {
  insertSalesOrder,
  insertSalesProduct,
  getSalesCustomer,
  getsalesOrder,
  updateSalesOrder,
  getSalesProducts,
  // getSalesCategory,
  productGrid,
  deleteOrder,
  deleteProduct,
  updateSalesProduct,
} = require('../controller/salesModule/salesControllers.js');
const {
  orderValidation,
  productValidation,
} = require('../middleware/salesModule/salesValidation.js');

const {
  orderHistory,
  newOrder,
} = require('../controller/salesModule/salesRender.js');

router.get(
  '/salesorder',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getsalesOrder
);
router.post(
  '/insertSalesOrder',
  orderValidation,
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  insertSalesOrder
);
router.post(
  '/insertSalesProduct',
  productValidation,
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  insertSalesProduct
);
router.get(
  '/getSalesProducts',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getSalesProducts
);
router.get(
  '/getCustomers',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getSalesCustomer
);
router.post(
  '/updateSalesOrder',
  orderValidation,
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  updateSalesOrder
);
router.post(
  '/updateSalesProduct',
  productValidation,
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  updateSalesProduct
);
// router.get('/getSalesCategories', getSalesCategory);
router.get(
  '/salesHistory',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  orderHistory
);
router.get(
  '/salesNewOrder',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  newOrder
);
router.get(
  '/getProductGrid',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  productGrid
);
router.get('/deleteSalesOrder', deleteOrder);
router.get('/deleteSalesProduct', deleteProduct);
//------------------------------------------------------

//---------Manage Customers
const {
  insertCustomer,
  updateCustomer,
  getCustomersPage,
  getAllCustomers,
  getParticularCustomer,
  deleteCustomer,
} = require('../controller/manageCustomers/manageCustomers.js');

const manageCustomerValidation = require('../middleware/manageCustomers/manageCustomerValidation.js');

const { uploadFile } = require('../controller/manageCustomers/manageCustomersFileUpload.js');

const { uploadCustomerFile } = require('../middleware/manageCustomers/manageCustomerFileUpload.js');

router.get('/manageCustomers', getCustomersPage);
router.get('/api/manageCustomers', getAllCustomers);
router.get('/api/getCustomers', getParticularCustomer);
router.post('/api/insertCustomer', manageCustomerValidation, insertCustomer);
router.post('/api/updateCustomer', manageCustomerValidation, updateCustomer);
router.get('/api/deleteCustomer', deleteCustomer);

router.post('/api/customersFileUpload', uploadCustomerFile.single("customersFile"), uploadFile);

//---------Manage Suppliers
const {
  insertSupplier,
  updateSupplier,
  getSuppliersPage,
  getAllSuppliers,
  getParticularSupplier,
  deleteSupplier,
} = require('../controller/manageSuppliers/manageSuppliers.js');

const manageSuppliersValidation = require('../middleware/manageSuppliers/manageSuppliersValidation.js');

router.get('/manageSuppliers', getSuppliersPage);
router.get('/api/manageSuppliers', getAllSuppliers);
router.get('/api/getSuppliers', getParticularSupplier);
router.post('/api/insertSupplier', manageSuppliersValidation, insertSupplier);
router.post('/api/updateSupplier', manageSuppliersValidation, updateSupplier);
router.get('/api/deleteSupplier', deleteSupplier);

// ---------Store
const {
  insertStore,
  getStore,
  getStorePage,
  updateStore,
  deleteStore,
  getParticularStore,
  filterStore,
} = require('../controller/stores/store.js');
router.get('/store', getStorePage);
router.get('/api/store', getStore);
router.get('/getStore', getParticularStore);
router.post('/insertStore', insertStore);
router.post('/updateStore', updateStore);
router.post('/deleteStore', deleteStore);
router.post('/filterStore', filterStore);

// ------------------- Manage Purchases ---------------------- //

const {
  fetchCombos,
  showPurchaseOrder,
  createPurchase,
  fetchSuppliers,
  fetchProducts,
  fetchWarehouses,
  createProductPurchase,
  fetchOrderDetails,
  updatePurchase,
  updateProductPurchase,
  deleteProductPurchase,
  purchaseValidations,
  checkValidation,
  fetchOrdersDetails,
  showPurchaseOrders,
} = require('../controller/purchase');

router.get(
  '/api/combos/:name',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  fetchCombos
);

router.get(
  '/api/purchase/suppliers',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  fetchSuppliers
);

router.get(
  '/api/purchase/products/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  fetchProducts
);

router.get(
  '/api/purchase/warehouses',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  fetchWarehouses
);

router.get(
  '/api/order/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  fetchOrderDetails
);

router.post(
  '/api/purchase/order',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkValidation(purchaseValidations.form1),
  createPurchase
);

router.put(
  '/api/purchase/order/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkValidation(purchaseValidations.form1),
  updatePurchase
);

router.post(
  '/api/purchase/product',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkValidation(purchaseValidations.form2),
  createProductPurchase
);

router.put(
  '/api/purchase/product/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkValidation(purchaseValidations.form2),
  updateProductPurchase
);

router.delete(
  '/api/purchase/product/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  deleteProductPurchase
);

router.get(
  '/api/orders',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  fetchOrdersDetails
);

router.get(
  '/purchaseOrder',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  showPurchaseOrder
);

router.get(
  '/purchaseHistory',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  showPurchaseOrders
);

// ------------------- Manage Purchases ---------------------- //

//---------------------Products Module---------------------
const { productListing } = require('../controller/product/productListing.js');
router.get('/product', productListing);

//---------------------Profile Module---------------------

const {
  viewProfile,
  editProfile,
  updateProfile,
} = require('../controller/profile/profile.js');
const { storeImage } = require('../controller/profile/uploadImage.js');
const { getOrderreport } = require('../service/report/orderReportService.js');

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  viewProfile
);
router.get('/profileEdit', editProfile);
router.post('/profileEdit', updateProfile);
router.post('/imageUpload', storeImage);

module.exports = router;
