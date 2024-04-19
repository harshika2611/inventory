const express = require('express');
const router = express.Router();

//login module
const {
<<<<<<< HEAD
	userLogout,
	checkUser,
	getUserName,
	userLogin,
	getLogin,
	getLink,
=======
  userLogout,
  checkUser,
  getUserName,
  userLogin,
  getLogin,
  getLink,
>>>>>>> main
} = require('../controller/login/login');
const { getHome } = require('../controller/home/homeController');
const { auth } = require('../middleware/auth');
const { getForgot, forgotPass } = require('../controller/login/forgot');
const passport = require('passport');
router.use(passport.initialize());
auth(passport);
const { checkLogin } = require('../controller/login/login.js');
<<<<<<< HEAD
router.get('/checkLogin', checkLogin);
router.get('/', getLogin);
router.post('/', userLogin);
router.get(
	'/home',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	getHome
=======
const loginFormValidation = require('../controller/login/loginValidation.js');
const forgotFormValidation = require('../controller/login/forgotValidation.js');
router.get('/checkLogin', checkLogin);
router.get('/', getLogin);
router.post('/', loginFormValidation, userLogin);
router.get(
  '/home',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getHome
>>>>>>> main
);
router.get('/user', getUserName);
router.post('/user', checkUser);
router.get('/activelink/:link', getLink);
router.get('/forgot', getForgot);
<<<<<<< HEAD
router.post('/forgot', forgotPass);
router.get(
	'/logout',
	passport.authenticate('jwt', { session: false }),
	userLogout
=======
router.post('/forgot', forgotFormValidation, forgotPass);
router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  userLogout
>>>>>>> main
);

//----------------------

//store combo
const { getStoreCombo } = require('../controller/manager/manager.js');
router.get('/storeCombo', getStoreCombo);

//manage manager

const {
<<<<<<< HEAD
	deleteManager,
	manageManager,
	getManager,
	getPerticularManager,
	listManagers,
	updateManager,
	insertManager,
=======
  deleteManager,
  manageManager,
  getManager,
  getPerticularManager,
  listManagers,
  updateManager,
>>>>>>> main
} = require('../controller/manager/manager');
const manageManagerFormValidation = require('../controller/manager/managerValidation.js');
router.get('/manager', getManager);
router.post('/manager', manageManagerFormValidation, manageManager);
router.get('/api/getmanagers', listManagers);
router.get('/api/getmanager/:id', getPerticularManager);
router.post('/updatemanager', manageManagerFormValidation, updateManager);
<<<<<<< HEAD
router.post('/api/deleteManager/:id', deleteManager);
router.get('/insertmanager', insertManager);

//----getCity and getState
const {
	getState,
	getCity,
=======
router.get('/api/deleteManager/:id', deleteManager);

//----getCity and getState
const {
  getState,
  getCity,
>>>>>>> main
} = require('../controller/commonFunctions/commonFunctions.js');
getState, getCity, router.get('/api/getState', getState);
router.post('/api/getCity', getCity);

//report

const {
<<<<<<< HEAD
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
=======
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
>>>>>>> main
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
<<<<<<< HEAD
	dashboard,
	getApiproductStock,
=======
  dashboard,
  getApiproductStock,
>>>>>>> main
} = require('../controller/dashboard/dashboard.js');
router.get('/dashboard', dashboard);
router.get('/api/productStock', getApiproductStock);
//-------------

//----------------------------sales Module-------------------------

const {
<<<<<<< HEAD
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
	getPayment,
} = require('../controller/salesModule/salesControllers.js');

const {
	orderHistory,
	newOrder,
=======
  insertSalesOrder,
  insertSalesProduct,
  getSalesCustomer,
  getsalesOrder,
  updateSalesOrder,
  getSalesProducts,
  getSalesCategory,
  productGrid,
  deleteOrder,
  deleteProduct,
  updateSalesProduct,
} = require('../controller/salesModule/salesControllers.js');

const {
  orderHistory,
  newOrder,
>>>>>>> main
} = require('../controller/salesModule/salesRender.js');

router.get('/salesorder', getsalesOrder);
router.post('/insertSalesOrder', insertSalesOrder);
router.post('/insertSalesProduct', insertSalesProduct);
router.get('/getSalesProducts', getSalesProducts);
router.get('/getCustomers', getSalesCustomer);
router.post('/updateSalesOrder', updateSalesOrder);
router.post('/updateSalesProduct', updateSalesProduct);
<<<<<<< HEAD
// router.get('/getSalesCategories', getSalesCategory);
router.get('/salesHistory', orderHistory);
router.get('/getPayment')
router.get(
	'/salesNewOrder',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	newOrder
);
router.get(
	'/getProductGrid',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	productGrid
=======
router.get('/getSalesCategories', getSalesCategory);
router.get('/salesHistory', orderHistory);
router.get(
  '/salesNewOrder',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  newOrder
);
router.get(
  '/getProductGrid',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  productGrid
>>>>>>> main
);
router.get('/deleteSalesOrder', deleteOrder);
router.get('/deleteSalesProduct', deleteProduct);
//------------------------------------------------------

//---------Manage Customers
const {
<<<<<<< HEAD
	insertCustomer,
	updateCustomer,
	getCustomersPage,
	getAllCustomers,
	getParticularCustomer,
	deleteCustomer,
} = require('../controller/manageCustomers/manageCustomers.js');

const manageCustomerValidation = require('../controller/manageCustomers/manageCustomerValidation.js');
=======
  insertCustomer,
  updateCustomer,
  getCustomersPage,
  getAllCustomers,
  getParticularCustomer,
  deleteCustomer,
} = require('../controller/manageCustomers/manageCustomers.js');

const manageCustomerValidation = require('../middleware/manageCustomers/manageCustomerValidation.js');
>>>>>>> main

router.get('/manageCustomers', getCustomersPage);
router.get('/api/manageCustomers', getAllCustomers);
router.get('/api/getCustomers', getParticularCustomer);
router.post('/api/insertCustomer', manageCustomerValidation, insertCustomer);
router.post('/api/updateCustomer', manageCustomerValidation, updateCustomer);
router.get('/api/deleteCustomer', deleteCustomer);

//---------Manage Suppliers
const {
<<<<<<< HEAD
	insertSupplier,
	updateSupplier,
	getSuppliersPage,
	getAllSuppliers,
	getParticularSupplier,
	deleteSupplier,
} = require('../controller/manageSuppliers/manageSuppliers.js');

const manageSuppliersValidation = require('../controller/manageSuppliers/manageSuppliersValidation.js');
=======
  insertSupplier,
  updateSupplier,
  getSuppliersPage,
  getAllSuppliers,
  getParticularSupplier,
  deleteSupplier,
} = require('../controller/manageSuppliers/manageSuppliers.js');

const manageSuppliersValidation = require('../middleware/manageSuppliers/manageSuppliersValidation.js');
>>>>>>> main

router.get('/manageSuppliers', getSuppliersPage);
router.get('/api/manageSuppliers', getAllSuppliers);
router.get('/api/getSuppliers', getParticularSupplier);
router.post('/api/insertSupplier', manageSuppliersValidation, insertSupplier);
router.post('/api/updateSupplier', manageSuppliersValidation, updateSupplier);
router.get('/api/deleteSupplier', deleteSupplier);

// ---------Store
const {
<<<<<<< HEAD
	insertStore,
	getStore,
	getStorePage,
	updateStore,
	deleteStore,
	getParticularStore,
	filterStore,
=======
  insertStore,
  getStore,
  getStorePage,
  updateStore,
  deleteStore,
  getParticularStore,
  filterStore,
>>>>>>> main
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
<<<<<<< HEAD
	fetchCombos,
	showPurchases,
	createPurchase,
	fetchSuppliers,
	fetchProducts,
	fetchWarehouses,
	createProductPurchase,
} = require('../controller/purchase');

router.get(
	'/api/combos/:name',
	// passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	fetchCombos
);

router.get(
	'/api/purchase/suppliers',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	fetchSuppliers
);

router.get(
	'/api/purchase/products',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	fetchProducts
);

router.get(
	'/api/purchase/warehouses',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	fetchWarehouses
);

router.post(
	'/api/purchase/order',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	createPurchase
);

router.post(
	'/api/purchase/product',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	createProductPurchase
);

router.get(
	'/purchaseOrder',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	showPurchases
=======
  fetchCombos,
  showPurchases,
  createPurchase,
  fetchSuppliers,
  fetchProducts,
  fetchWarehouses,
  createProductPurchase,
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
  '/api/purchase/products',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  fetchProducts
);

router.get(
  '/api/purchase/warehouses',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  fetchWarehouses
);

router.post(
  '/api/purchase/order',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  createPurchase
);

router.post(
  '/api/purchase/product',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  createProductPurchase
);

router.get(
  '/purchaseOrder',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  showPurchases
>>>>>>> main
);

// ------------------- Manage Purchases ---------------------- //

//---------------------Products Module---------------------
const { productListing } = require('../controller/products/productListing.js');
router.get('/products', productListing);

//---------------------Profile Module---------------------

const {
<<<<<<< HEAD
	viewProfile,
	editProfile,
	updateProfile,
=======
  viewProfile,
  editProfile,
  updateProfile,
>>>>>>> main
} = require('../controller/profile/profile.js');
const { storeImage } = require('../controller/profile/uploadImage.js');
const { getOrderreport } = require('../service/report/orderReportService.js');

router.get('/profile', viewProfile);
router.get('/profileEdit', editProfile);
router.post('/profileEdit', updateProfile);
router.post('/imageUpload', storeImage);

module.exports = router;
