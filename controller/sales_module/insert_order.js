const connection = require("../../config/connection");
const logger = require("../../logs");

async function insert_order(req, res) {
  sql = `insert into order_master values (default,?,?,?,?,?,current_timestamp(),current_timestamp());`;
  const [row, field] = await connection.execute(`set FOREIGN_KEY_CHECKS=1;`);
  const header = [];
  const input = [req.body.customer_id,req.body.type,req.body.amount,`${req.body.addr}`,req.body.payment_status];

  const [rows, fields] = await connection.execute(sql, input);

  
  logger.info(rows);
  res.json({ rows });
}
module.exports = insert_order;
