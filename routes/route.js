const express = require('express');
const router = express.Router();
const { userLogin, getLogin } = require('../controller/login/login');
const { getHome } = require('../controller/home/homeController')
const { auth } = require('../middleware/auth');
const { getForgot, forgotpass } = require('../controller/login/forgot');
const { listManagers } = require('../controller/manager/manager');
const getsales = require('../controller/sales_module/sales_data');
const insert_order = require('../controller/sales_module/insert_order');
<<<<<<< HEAD
const {stores} = require('../controller/stores/store.js');
=======
const { stores } = require('../controller/stores/store.js');
>>>>>>> 20e583cc2516841fa41ef5688d1def406ec76137
const passport = require('passport');
router.use(passport.initialize());
auth(passport);


const { insertCustomer, updateCustomer, getCustomers, deleteCustomer, filterCustomer } = require('../controller/manageCustomers/manageCustomers.js');


//---------Manage Customers
router.get('/home', passport.authenticate('jwt', { session: false }), getHome);

router.get('/forgot', getForgot);

router.get('/manager', listManagers);

router.post('/forgot', forgotpass);


//sales Module

const getsales = require("../controller/salesModule/salesData");
router.get("/salesorder", getsales);
<<<<<<< HEAD
router.post('/insert', insert_order);
router.get('/store', stores);
=======
>>>>>>> 20e583cc2516841fa41ef5688d1def406ec76137

const insertOrder = require('../controller/salesModule/addOrder');
router.post('/insertSalesOrder', insertOrder);

const insertProduct = require('../controller/salesModule/addProducts');
router.post('/insertProduct', insertProduct);

const getProducts = require('../controller/salesModule/getProducts');
router.get('/getProducts', getProducts);

const getCustomers = require('../controller/salesModule/getCustomers');
router.get('/getCustomers', getCustomers);

const updateOrder = require('../controller/salesModule/updateOrders');
router.post('/updateOrder', updateOrder);

router.get('/manageCustomers', getCustomers);
router.post('/insertCustomer', insertCustomer);
router.post('/updateCustomer', updateCustomer);
router.post('/deleteCustomer/:id', deleteCustomer);
router.post('/filterCustomer', filterCustomer);
module.exports = router;
