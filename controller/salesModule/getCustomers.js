const connection = require("../../config/connection");
const logger = require("../../logs");
const selectQuery = require('../../service/selectQuery');

async function getProducts(req, res) {
  try{
  let order = req.query.order;
  let orderby = req.query.orderby;

  const [rows, fields] = await selectQuery('customer_master',orderby,order);

  const header = [];
  fields.forEach((ele) => {
    header.push(ele.name);
  });
  res.json({ rows, header });
}
catch(err){
  logger.logError(err);
  
}
}
module.exports = getProducts;
