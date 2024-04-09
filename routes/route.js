require('dotenv').config();
const express = require('express');
const router = express.Router();

router.get('./login',(req,res)=>{
  
})

const getsales = require('../controller/sales_data')
router.get('./salesorder',getsales)
module.exports = router;