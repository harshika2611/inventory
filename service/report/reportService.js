const connection = require("../../config/connection");
const logger = require("../../logs");
const getAllorderreport = async () => {
  let sql =
    "SELECT order_name,customer_master.firstname ,amount,shipping_address,order_date ,payment_status FROM inventory_management.sales_order left join customer_master on sales_order.customer_id = customer_master.id;";
  return await connection.execute(sql);
};
module.exports = { getAllorderreport };
