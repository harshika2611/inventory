require("dotenv").config();
const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const {userLogin}=require('../controller/loginController');
=======
const {userLogin,getLogin}=require('../controller/login/login');
const {getHome}=require('../controller/home/homeController')
>>>>>>> 6c03b51345e006ec04055d79d4e604df6eeabcb5
const { auth } = require('../middleware/auth');
const {getForgot,forgotpass}=require('../controller/login/forgot')
const getsales = require("../controller/sales_module/sales_data");
const insert_order = require('../controller/sales_module/insert_order');
const passport = require('passport');
router.use(passport.initialize());
auth(passport);

<<<<<<< HEAD
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
=======
router.get('/',getLogin);
router.post('/',userLogin);

router.get('/home',passport.authenticate("jwt",{session:false}),getHome);

router.get('/forgot',getForgot);

router.post('/forgot',forgotpass);

>>>>>>> 6c03b51345e006ec04055d79d4e604df6eeabcb5
router.get("/salesorder", getsales);
router.post('/insert',insert_order);

module.exports = router;
