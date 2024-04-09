const connection = require("../../config/connection");
const logger = require("../../logs");
const selectQuery = require('../../service/selectQuery');

async function getsales(req, res) {
  let order = req.query.order;
  let orderby = req.query.orderby;

  const [rows, fields] = await selectQuery('order_master',orderby,order);

  const header = [];
  fields.forEach((ele) => {
    header.push(ele.name);
  });
  res.json({ rows, header });
}
module.exports = getsales;
