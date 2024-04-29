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
auth(passport);
const { checkLogin } = require('../controller/login/login.js');
const loginFormValidation = require('../middleware/login/loginValidation.js');
const forgotFormValidation = require('../middleware/login/forgotValidation.js');
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
router.get('/activelink/:link/:id', getLink);
router.get('/forgot', getForgot);
router.post('/forgot', forgotFormValidation, forgotPass);
router.get(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  userLogout
);

//check role
const { checkRole } = require('../middleware/checkRole/checkRole.js');

//store with city combo
const {
  getStoreCombo,
  getCityCombo,
} = require('../controller/manager/manager.js');
router.get('/storeCombo/:id', getStoreCombo);
router.get('/cityCombo', getCityCombo);

//manage manager

const {
  deleteManager,
  manageManager,
  getManager,
  getPerticularManager,
  listManagers,
  updateManager,
} = require('../controller/manager/manager');
const manageManagerFormValidation = require('../middleware/manager/managerValidation.js');
router.get(
  '/manager',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  getManager
);
router.post(
  '/manager',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  manageManagerFormValidation,
  manageManager
);
router.get(
  '/api/getmanagers',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  listManagers
);
router.get(
  '/api/getmanager/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  getPerticularManager
);
router.post(
  '/updatemanager',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  manageManagerFormValidation,
  updateManager
);
router.get(
  '/api/deleteManager/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  deleteManager
);

//----getCity and getState
const {
  getState,
  getCity,
} = require('../controller/commonFunctions/commonFunctions.js');
router.get('/api/getState', getState);
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

const {
  reportPdfPage,
  productReportGenerate,
  outOfStockProducts
} = require('../controller/report/reportPdf.js');

const {
  getCombosDetails,
} = require('../controller/commonFunctions/commonFunctions.js');

router.get(
  '/salesReport',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getsalesReport
);
router.get(
  '/salesReportallProducts',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getReportallProducts
);
router.get(
  '/api/salesreport/allproduct',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getApiproductreport
);
router.get(
  '/api/salesreport/allcategory',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getApicategoryreport
);

router.get(
  '/purchaseReport',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getpurchaseReport
);
router.get(
  '/api/purchasereport/allproduct',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getApiproductPurchasereport
);

router.get(
  '/orderReport',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getorderReport
);
router.get(
  '/orderProduct/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getorderProducts
);
router.get(
  '/api/orderreport/allorder',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getApiorderRreport
);
router.get(
  '/api/orderreport/allproduct/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getApiordersProductRreport
);

// passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
router.post(
  '/api/combos',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getCombosDetails
);
// router.post('/api/pdfTemplate', generatePdf);
router.get(
  '/reportGenerate',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  reportPdfPage
);

router.post(
  '/reportGenerate',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  productReportGenerate
);

router.post(
  '/api/outOfStockProductReport',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  outOfStockProducts
);

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
router.get(
  '/api/productStock',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getApiproductStock
);
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
  invoicePdf,
} = require('../controller/salesModule/salesRender.js');

const {
  invoiceGenerator,
  pdfTokenVerify,
} = require('../controller/salesModule/pdfGeneration.js');

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
router.get(
  '/deleteSalesOrder',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  deleteOrder
);
router.get(
  '/deleteSalesProduct',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  deleteProduct
);
router.get(
  '/getPdf',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  invoiceGenerator
);
router.get(
  '/invoice',
  pdfTokenVerify,
  // passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  invoicePdf
);

router.get(
  '/salesOrderView',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  invoicePdf
);

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

const {
  uploadFile,
} = require('../controller/manageCustomers/manageCustomersFileUpload.js');

const {
  uploadCustomerFile,
} = require('../middleware/manageCustomers/manageCustomerFileUpload.js');

router.get(
  '/manageCustomers',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getCustomersPage
);
router.get(
  '/api/manageCustomers',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getAllCustomers
);
router.get(
  '/api/getCustomers',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getParticularCustomer
);
router.post(
  '/api/insertCustomer',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  manageCustomerValidation,
  insertCustomer
);
router.post(
  '/api/updateCustomer',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  manageCustomerValidation,
  updateCustomer
);
router.get(
  '/api/deleteCustomer',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  deleteCustomer
);

router.post(
  '/api/customersFileUpload',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  uploadCustomerFile.single('customersFile'),
  uploadFile
);

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

const {
  supplierUploadFile,
} = require('../controller/manageSuppliers/manageSuppliersFileUpload.js');
const {
  uploadSupplierFile,
} = require('../middleware/manageSuppliers/manageSupplierFileUpload.js');

router.get(
  '/manageSuppliers',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getSuppliersPage
);
router.get(
  '/api/manageSuppliers',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getAllSuppliers
);
router.get(
  '/api/getSuppliers',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getParticularSupplier
);
router.post(
  '/api/insertSupplier',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  manageSuppliersValidation,
  insertSupplier
);
router.post(
  '/api/updateSupplier',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  manageSuppliersValidation,
  updateSupplier
);
router.get(
  '/api/deleteSupplier',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  deleteSupplier
);

router.post(
  '/api/suppliersFileUpload',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  uploadSupplierFile.single('suppliersFile'),
  supplierUploadFile
);

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
const storeValidation = require('../middleware/store/storeValidation.js');

router.get(
  '/store',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  getStorePage
);
router.get(
  '/api/store',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  getStore
);
router.get(
  '/getStore',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  getParticularStore
);
router.post(
  '/insertStore',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  storeValidation,
  insertStore
);
router.post(
  '/updateStore',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  storeValidation,
  updateStore
);
router.post(
  '/deleteStore',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  checkRole,
  deleteStore
);
// router.post('/filterStore',passport.authenticate('jwt', { session: false, failureRedirect: '/' }), filterStore);

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
  showPurchaseOrders,
  fetchPurchases,
  deletePurchase,
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
  checkValidation({
    ...purchaseValidations.form1,
    supplier_id: { required: false },
    storage_id: { requried: false },
  }),
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
  checkValidation({
    ...purchaseValidations.form2,
    product_id: { required: false },
  }),
  updateProductPurchase
);

router.delete(
  '/api/purchase/product/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  deleteProductPurchase
);

router.get(
  '/api/purchases',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  fetchPurchases
);

router.delete(
  '/api/purchase/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  deletePurchase
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
const {
  deleteMainProduct,
  manageProduct,
  productListing,
  getApiproduct,
  getProductDetails,
} = require('../controller/product/productListing.js');
const {
  productInfo,
  productInfoPost,
  productInfoValid,
  productValid,
} = require('../controller/product/productInfo.js');
const manageProductFormValidation = require('../middleware/product/productValidation.js');
router.get(
  '/products',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  productListing
);
router.post(
  '/products',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  manageProductFormValidation,
  manageProduct
);
router.get(
  '/productInfo',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  productInfo
);
router.post(
  '/productInfo',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  productInfoValid(productValid),
  productInfoPost
);
router.get(
  '/api/products',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getApiproduct
);
router.get(
  '/api/productDetails/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  getProductDetails
);
router.get(
  '/api/deleteProduct/:id',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  deleteMainProduct
);

//---------------------Profile Module---------------------

const {
  viewProfile,
  editProfile,
  updateProfile,
} = require('../controller/profile/profile.js');
const { userProfileStorage } = require('../middleware/multer/multer.js');
const upload = multer({ storage: userProfileStorage });

router.get(
  '/profile',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  viewProfile
);
router.get(
  '/profileEdit',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  editProfile
);
router.post(
  '/profileEdit',
  passport.authenticate('jwt', { session: false, failureRedirect: '/' }),
  upload.single('newImage'),
  updateProfile
);
// router.post('/imageUpload',storeImage);

module.exports = router;
