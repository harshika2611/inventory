const express = require('express');
const router = express.Router();

// const {
//   insertStore,
//   getStore,
//   updateStore,
// } = require('../controller/stores/store.js');


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
const { getForgot } = require('../controller/login/forgot');
const { forgotPassService } = require('../service/login/forgot.js');
const passport = require('passport');
const { getReport, getAllreport } = require("../controller/report/report");
router.use(passport.initialize());
auth(passport);
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
router.post('/forgot', forgotPassService);
router.get(
	'/logout',
	passport.authenticate('jwt', { session: false }),
	userLogout
);

//----Dashboard
const dashboard = require('../controller/dashboard/dashboard.js');
router.get('/dashboard', dashboard);

//manager module
const {
	addManager,
	listManagers,
	updateManager,
	insertManager,
} = require('../controller/manager/manager');
router.get('/addmanager', addManager);
router.get('/insertmanager', insertManager);
router.get('/getmanager', listManagers);
router.get('/updatemanager', updateManager);
const {
	insertCustomer,
	updateCustomer,
	getCustomers,
	deleteCustomer,
	filterCustomer,
} = require('../controller/manageCustomers/manageCustomers.js');
const{
  insertStore,
  getStore,
  updateStore,
  deleteStore,
} = require('../controller/stores/store.js');

const { getState, getCity } = require('../controller/commonFunctions/commonFunctions.js');

//----getCity and getState
router.get('/api/getState', getState);
router.post('/api/getCity', getCity);

//-----
router.get("/", getLogin);
router.post("/", userLogin);
router.get(
  "/home",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  getHome
);
router.get("/user", getUserName);
router.post("/user", checkUser);
router.get("/activelink/:link", getLink);
router.get("/forgot", getForgot);

//report
router.get("/report", getReport);
router.get("/api/salesreport/allreport", getAllreport);

//----Dashboard

// router.get("/dashboard", dashboard);
//-------------

//----------------------------sales Module-------------------------------------------------

const {
  insertSalesOrder,
  insertSalesProduct,
  getSalesCustomer,
  getsalesOrder,
  updateSalesOrder,
  getSalesProducts,
} = require("../controller/salesModule/salesControllers.js");

router.get("/salesorder", getsalesOrder);
router.post("/insertSalesOrder", insertSalesOrder);
router.post("/insertProduct", insertSalesProduct);
router.get("/getProducts", getSalesProducts);
router.get("/getCustomers", getSalesCustomer);
router.post("/updateOrder", updateSalesOrder);

router.get('/sales', (req, res) => {
	res.render('salesModule/sales');
});
//------------------------------------------------------

//---------Manage Customers
router.get('/manageCustomers', getCustomers);
router.post('/insertCustomer', insertCustomer);
router.post('/updateCustomer', updateCustomer);
router.post('/deleteCustomer/:name', deleteCustomer);
router.post('/filterCustomer', filterCustomer);

// ---------Store
router.get('/store', getStore);
router.post('/insertStore', insertStore);
router.post('/updateStore', updateStore);
router.post('/deleteStore/:name', deleteStore);

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
