require("dotenv").config();
const express = require("express");
const router = express.Router();
const {userLogin}=require('../controller/loginController');
const { auth } = require('../middleware/auth');
var passport = require('passport');
router.use(passport.initialize());
auth(passport);

router.get('/login',(req,res)=>{
  res.render('login');
})
router.post('/login',userLogin);


router.get('/home',passport.authenticate("jwt",{session:false}),(req,res)=>{
  res.render('home');
})

router.get('/forgot',(req,res)=>{
  res.render('forgot');
})
router.get("/store",(req, res) => {
  res.render("stores/store", { message: "Not Found" });
});
const getsales = require("../controller/sales_module/sales_data");
const insert_order = require('../controller/sales_module/insert_order');
router.get("/salesorder", getsales);
router.post('/insert',insert_order);

module.exports = router;
