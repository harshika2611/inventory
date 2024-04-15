const express = require("express");
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
const { getForgot } = require('../controller/login/forgot');
const { forgotPassService } = require('../service/login/forgot.js');
const passport = require('passport');
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
router.use(passport.initialize());
auth(passport);
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
router.post("/forgot", forgotPassService);
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  userLogout
);

//manage manager

const {
  manageManager,
  getManager,
  addManager,
  listManagers,
  updateManager,
  insertManager,
} = require('../controller/manager/manager');
router.get('/getmanager', getManager);
router.post('/getmanager', manageManager);
router.get('/addmanager', addManager);
router.get('/insertmanager', insertManager);
router.get('/getmanager', listManagers);
router.get('/updatemanager', updateManager);

//----getCity and getState
const {
  getState,
  getCity,
} = require('../controller/commonFunctions/commonFunctions.js');

router.get("/api/getState", getState);
router.post("/api/getCity", getCity);

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
  fetchOneOrder,
} = require("../controller/salesModule/salesControllers.js");
const { renderPage } = require("../controller/salesModule/sales.js");

router.get("/fetchOneOrder", fetchOneOrder);
router.get("/salesorder", getsalesOrder);
router.post("/insertSalesOrder", insertSalesOrder);
router.post("/insertSalesProduct", insertSalesProduct);
router.get("/getSalesProducts", getSalesProducts);
router.get("/getCustomers", getSalesCustomer);
router.post("/updateSalesOrder", updateSalesOrder);
router.get("/getSalesCategories", getSalesCategory);
router.get("/sales", renderPage);
router.get("/getProductGrid", productGrid);
//------------------------------------------------------

//---------Manage Customers
const {
  insertCustomer,
  updateCustomer,
  getCustomers,
  getParticularCustomer,
  deleteCustomer,
  filterCustomer,
} = require("../controller/manageCustomers/manageCustomers.js");

const manageCustomerValidation = require('../controller/manageCustomers/manageCustomerValidation.js');

router.get('/manageCustomers', getCustomers);
router.get('/api/getCustomers', getParticularCustomer);
router.post('/api/insertCustomer', manageCustomerValidation, insertCustomer);
router.post('/api/updateCustomer', updateCustomer);
router.post('/deleteCustomer/:name', deleteCustomer);
router.post('/filterCustomer', filterCustomer);

// ---------Store
const {
  insertStore,
  getStore,
  updateStore,
  deleteStore,
} = require("../controller/stores/store.js");
router.get("/store", getStore);
router.post("/insertStore", insertStore);
router.post("/updateStore/:name", updateStore);
router.post("/deleteStore/:name", deleteStore);

// ------------------- Manage Purchases ---------------------- //

const {
  fetchCombos,
  showPurchases,
  createPurchase,
  fetchSuppliers,
} = require("../controller/purchase");

router.get(
  "/api/combos/:name",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  fetchCombos
);

router.get(
  "/api/purchase/suppliers",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  fetchSuppliers
);

router.post(
  "/api/purchase/purchase",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
  createPurchase
);

router.get(
  "/purchase",
  passport.authenticate("jwt", { session: false, failureRedirect: "/" }),
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
} = require('../controller/profile/profile.js');
router.get('/profile', viewProfile);
router.get('/profileEdit', editProfile);

module.exports = router;
