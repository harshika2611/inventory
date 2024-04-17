const express = require('express');
const router = express.Router();


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
const { getForgot,forgotPass } = require('../controller/login/forgot');

const passport = require('passport');
router.use(passport.initialize());
auth(passport);
const {checkLogin}=require('../controller/login/login.js');
router.get('/checkLogin',checkLogin);
router.get('/', getLogin);
router.post('/',userLogin);
router.get(
  '/home',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getHome
);
router.get('/user', getUserName);
router.post('/user', checkUser);
router.get('/activelink/:link', getLink);
router.get('/forgot', getForgot);
router.post('/forgot', forgotPass);
router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  userLogout
);

//----------------------

const {
	getsallesReport,
	getApiproductreport,
	getApicategoryreport,
	getReportallProducts,
} = require('../controller/report/sallesReport.js');
const {
	getpurchaseReport,
	getApiproductPurchasereport,
} = require('../controller/report/purchaseReport.js');



//store combo
const {getStoreCombo}=require('../controller/manager/manager.js')
router.get('/storeCombo', getStoreCombo);



//manage manager

const {
  manageManager,
  getManager,
  addManager,
  listManagers,
  updateManager,
  insertManager,
} = require('../controller/manager/manager');

router.get('/manager', getManager);
router.post('/manager', manageManager);
router.get('/addmanager', addManager);
router.get('/insertmanager', insertManager);
router.get('/api/getmanager', listManagers);
router.get('/updatemanager', updateManager);

//----getCity and getState
const {
  getState,
  getCity,
} = require('../controller/commonFunctions/commonFunctions.js');

router.get('/api/getState', getState);
router.post('/api/getCity', getCity);

//-----
router.get('/', getLogin);
router.post('/', userLogin);
router.get(
  '/home',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getHome
);
router.get('/user', getUserName);
router.post('/user', checkUser);
router.get('/activelink/:link', getLink);
router.get('/forgot', getForgot);

//report

router.get('/sallesReport', getsallesReport);
router.get('/sallesReportallProducts', getReportallProducts);
router.get('/api/sallesreport/allproduct', getApiproductreport);
router.get('/api/sallesreport/allcategory', getApicategoryreport);

router.get('/purchaseReport', getpurchaseReport);
router.get('/api/purchasereport/allproduct', getApiproductPurchasereport);

//----Dashboard
const dashboard = require('../controller/dashboard/dashboard.js');
router.get('/dashboard', dashboard);
//-------------

//----------------------------sales Module-------------------------

const {
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
  updateSalesProduct
} = require('../controller/salesModule/salesControllers.js');
const { orderHistory,newOrder } = require('../controller/salesModule/sales.js');


router.get('/salesorder', getsalesOrder);
router.post('/insertSalesOrder', insertSalesOrder);
router.post('/insertSalesProduct', insertSalesProduct);
router.get('/getSalesProducts', getSalesProducts);
router.get('/getCustomers', getSalesCustomer);
router.post('/updateSalesOrder', updateSalesOrder);
router.post('/updateSalesProduct', updateSalesProduct);
router.get('/getSalesCategories', getSalesCategory);
router.get('/salesHistory', orderHistory);
router.get('/salesNewOrder', newOrder);
router.get('/getProductGrid', productGrid);
router.get('/deleteSalesOrder',deleteOrder)
router.get('/deleteSalesProduct',deleteProduct)
//------------------------------------------------------

//---------Manage Customers
const {
  insertCustomer,
  updateCustomer,
  getCustomersPage,
  getAllCustomers,
  getParticularCustomer,
  deleteCustomer,
  filterCustomer,
} = require("../controller/manageCustomers/manageCustomers.js");

const manageCustomerValidation = require('../controller/manageCustomers/manageCustomerValidation.js');

router.get('/manageCustomers', getCustomersPage);
router.get('/api/manageCustomers', getAllCustomers);
router.get('/api/getCustomers', getParticularCustomer);
router.post('/api/insertCustomer', manageCustomerValidation, insertCustomer);
router.post('/api/updateCustomer', manageCustomerValidation, updateCustomer);
router.get('/api/deleteCustomer', deleteCustomer);
router.post('/filterCustomer', filterCustomer);

// ---------Store
const {
  insertStore,
  getStore,
  updateStore,
  deleteStore,
  getParticularStore,
} = require('../controller/stores/store.js');
router.get('/store', getStore);
router.get('/getStore', getParticularStore);
router.post('/insertStore', insertStore);
router.post('/updateStore', updateStore);
router.post('/deleteStore', deleteStore);

// ------------------- Manage Purchases ---------------------- //

const {
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
);

// ------------------- Manage Purchases ---------------------- //

//---------------------Products Module---------------------
const { productListing } = require('../controller/products/productListing.js');
router.get('/products', productListing);

//---------------------Profile Module---------------------

const {
  viewProfile,
  editProfile,
  updateProfile,
} = require('../controller/profile/profile.js');
router.get('/profile', viewProfile);
router.get('/profileEdit', editProfile);
router.post('/profileEdit', updateProfile);

module.exports = router;
