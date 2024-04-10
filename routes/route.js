require("dotenv").config();
const express = require("express");
const router = express.Router();
const {userLogin,getLogin}=require('../controller/loginController');
const { auth } = require('../middleware/auth');
var passport = require('passport');
router.use(passport.initialize());
auth(passport);

router.get('/login',getLogin);
router.post('/login',userLogin);

router.get('/home',passport.authenticate("jwt",{session:false}),(req,res)=>{
  res.render('home');
})

router.get('/forgot',(req,res)=>{
  res.render('forgot');
})

router.get('/home',passport.authenticate("jwt",{session:false}),(req,res)=>{
  res.render('home');
})

router.get('/forgot',(req,res)=>{
  res.render('forgot');
})




//sales Module

const getsales = require("../controller/salesModule/salesData");
router.get("/salesorder",getsales);

const insertOrder = require('../controller/salesModule/addOrder');
router.post('/insertSalesOrder',insertOrder);

const insertProduct = require('../controller/salesModule/addProducts');
router.post('/insertProduct', insertProduct);

const getProducts = require('../controller/salesModule/getProducts');
router.get('/getProducts', getProducts);

const getCustomers = require('../controller/salesModule/getCustomers');
router.get('/getCustomers', getCustomers);

const updateOrder = require('../controller/salesModule/updateOrders');
router.post('/updateOrder', updateOrder);

module.exports = router;
