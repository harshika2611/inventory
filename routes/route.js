require("dotenv").config();
const express = require("express");
const router = express.Router();
const {userLogin,getLogin}=require('../controller/login/login');
const {getHome}=require('../controller/home/homeController')
const { auth } = require('../middleware/auth');
const {getForgot,forgotpass}=require('../controller/login/forgot')
const getsales = require("../controller/sales_module/sales_data");
const insert_order = require('../controller/sales_module/insert_order');
const passport = require('passport');
router.use(passport.initialize());
auth(passport);

router.get('/',getLogin);
router.post('/',userLogin);

router.get('/home',passport.authenticate("jwt",{session:false}),getHome);

router.get('/forgot',getForgot);

router.post('/forgot',forgotpass);

router.get("/salesorder", getsales);
router.post('/insert',insert_order);

module.exports = router;
