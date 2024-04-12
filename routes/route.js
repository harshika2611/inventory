const express = require("express");
const router = express.Router();
const {
  userLogout,
  checkUser,
  getUserName,
  userLogin,
  getLogin,
  getLink,
} = require("../controller/login/login");
const { getHome } = require("../controller/home/homeController");
const { auth } = require("../middleware/auth");
const { getForgot, forgotPass } = require("../controller/login/forgot");
// const {
//   insertStore,
//   getStore,
//   updateStore,
// } = require("../controller/stores/store.js");

//----Dashboard
const dashboard = require("../controller/dashboard/dashboard.js");

//----Dashboard

router.get("/dashboard", dashboard);
//-------------
//manage manager

//------------
const {
  addManager,
  listManagers,
  updateManager,
  insertManager,
} = require("../controller/manager/manager");
// const getsales = require('../controller/sales_module/sales_data');
// const insert_order = require('../controller/sales_module/insert_order');
const { stores } = require("../controller/stores/store.js");
const passport = require("passport");
const { getreport } = require("../controller/report/report");
router.use(passport.initialize());
auth(passport);

const {
  insertCustomer,
  updateCustomer,
  getCustomers,
  deleteCustomer,
  filterCustomer,
} = require("../controller/manageCustomers/manageCustomers.js");

const {
  insertStore,
  getStore,
  updateStore,
} = require("../controller/stores/store.js");

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
router.get("/report", getreport);

//----Dashboard

router.get("/dashboard", dashboard);
//-------------
//manage manager
router.post("/forgot", forgotPass);
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  userLogout
);

//manager module
router.get("/addmanager", addManager);
router.get("/insertmanager", insertManager);
router.get("/getmanager", listManagers);
router.get("/updatemanager", updateManager);

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

router.get("/sales", (req, res) => {
  res.render("salesModule/sales");
});
//------------------------------------------------------



//---------Manage Customers
router.get("/manageCustomers", getCustomers);
router.post("/insertCustomer", insertCustomer);
router.post("/updateCustomer", updateCustomer);
router.post("/deleteCustomer/:id", deleteCustomer);
router.post("/filterCustomer", filterCustomer);

// ---------Store
router.get("/store", getStore);
router.post("api/store/insertStore", insertStore);
router.post("api/store/updateStore", updateStore);

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

module.exports = router;
