const express = require('express');
const router = express.Router();
const { userLogin, getLogin } = require('../controller/login/login');
const { getHome } = require('../controller/home/homeController');
const { auth } = require('../middleware/auth');
const { getForgot, forgotpass } = require('../controller/login/forgot');

//----Dashboard
const dashboard = require('../controller/dashboard/dashboard.js');
//------------
const {
	listManagers,
	updateManager,
	insertManager,
} = require('../controller/manager/manager');
// const getsales = require('../controller/sales_module/sales_data');
// const insert_order = require('../controller/sales_module/insert_order');

const passport = require('passport');
const { getreport } = require('../controller/report/report');
router.use(passport.initialize());
auth(passport);

//----Manage Customers
const {
	insertCustomer,
	updateCustomer,
	getCustomers,
	deleteCustomer,
	filterCustomer,
} = require('../controller/manageCustomers/manageCustomers.js');

const {
  insertStore,
  getStore,
  updateStore
} = require('../controller/stores/store.js')

router.get('/', getLogin);
router.post('/', userLogin);
router.get(
	'/home',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	getHome
);
router.get('/forgot', getForgot);
router.post('/forgot', forgotpass);

//report
router.get('/report', getreport);

//----Dashboard

router.get('/dashboard', dashboard);
//-------------
//manage manager

router.get('/insertmanager', insertManager);
router.get('/getmanager', listManagers);
router.get('/updatemanager', updateManager);

//sales Module

const getorders = require('../controller/salesModule/salesData');
router.get('/salesorder', getorders);
const insertOrder = require('../controller/salesModule/addOrder');
router.post('/insertSalesOrder', insertOrder);
const insertProduct = require('../controller/salesModule/addProducts');
router.post('/insertProduct', insertProduct);
const getProducts = require('../controller/salesModule/getProducts');
router.get('/getProducts', getProducts);
const getCustomersSales = require('../controller/salesModule/getCustomers');
router.get('/getCustomers', getCustomersSales);
const updateOrder = require('../controller/salesModule/updateOrders');
router.post('/updateOrder', updateOrder);

router.get('/sales', (req, res) => {
	res.render('salesModule/sales');
});

//---------Manage Customers
router.get('/manageCustomers', getCustomers);
router.post('/insertCustomer', insertCustomer);
router.post('/updateCustomer', updateCustomer);
router.post('/deleteCustomer/:id', deleteCustomer);
router.post('/filterCustomer', filterCustomer);

// ---------Store
router.get('/store', getStore);
router.post('api/store/insertStore', insertStore);
router.post('api/store/updateStore', updateStore);

// ------------------- Manage Purchases ---------------------- //

const {
	fetchCombos,
	showPurchases,
	createPurchase,
	fetchSuppliers,
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

router.post(
	'/api/purchase/purchase',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	createPurchase
);

router.get(
	'/purchase',
	passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
	showPurchases
);

// ------------------- Manage Purchases ---------------------- //

module.exports = router;
