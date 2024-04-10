const express = require('express');
const router = express.Router();
const { userLogin, getLogin } = require('../controller/login/login');
const { getHome } = require('../controller/home/homeController');
const { auth } = require('../middleware/auth');
const { getForgot, forgotpass } = require('../controller/login/forgot');

const { listManagers,updateManager } = require('../controller/manager/manager');
const getsales = require('../controller/sales_module/sales_data');
const insert_order = require('../controller/sales_module/insert_order');


const { stores } = require('../controller/stores/store.js');

const passport = require('passport');
router.use(passport.initialize());
auth(passport);

const {
	insertCustomer,
	updateCustomer,
	getCustomers,
	deleteCustomer,
	filterCustomer,
} = require('../controller/manageCustomers/manageCustomers.js');

//---------Manage Customers
router.get('/home', passport.authenticate('jwt', { session: false }), getHome);

router.get('/forgot', getForgot);


router.get('/getmanager', listManagers);

router.get('/updatemanager', updateManager);



router.post('/forgot', forgotpass);

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

router.get('/manageCustomers', getCustomers);
router.post('/insertCustomer', insertCustomer);
router.post('/updateCustomer', updateCustomer);
router.post('/deleteCustomer/:id', deleteCustomer);
router.post('/filterCustomer', filterCustomer);
module.exports = router;
