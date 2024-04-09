require("dotenv").config();
const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {

})

const getsales = require("../controller/sales_module/sales_data");
const insert_order = require('../controller/sales_module/insert_order');
router.get("/salesorder", getsales);
router.post('/insert',insert_order);
module.exports = router;