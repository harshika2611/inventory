const connection = require('../../config/connection');
const logger = require('../../logs');
const getOrderreport = async () => {
  // console.log(product);
  let sql = `SELECT sales_order.id as Order_Id ,sales_name as Order_Name ,customer_master.firstname as Costomer_name,option_master.value as Order_Status,amount as Order_Amount,option_master.value as Payment_Status ,order_date,sales_order.created_at as created_Time  FROM sales_order left join customer_master on sales_order.customer_id=customer_master.id left join option_master on sales_order.type=option_master.id order by created_Time desc;`;

  // console.log(sql);
  return await connection.execute(sql);
};

const getApiordersProduct = async (id) => {
  // console.log(product);
  let sql = `SELECT sales_products.product_id,product_master.product_name,product_master.cost as Product_cost,sales_products.quantity FROM sales_products left join sales_order on sales_products.order_id=sales_order.id left join product_master on sales_products.product_id=product_master.id where sales_order.id=?;`;

  // console.log(sql);
  return await connection.execute(sql, [id]);
};

const getOrderreportBydate = async (fromDate, toDate) => {
  let sql = `SELECT sales_order.id as Order_Id ,sales_name as Order_Name ,customer_master.firstname as Costomer_name,option_master.value as Order_Status,amount as Order_Amount,option_master.value as Payment_Status ,order_date,sales_order.created_at as created_Time  FROM sales_order left join customer_master on sales_order.customer_id=customer_master.id left join option_master on sales_order.type=option_master.id where sales_order.created_at BETWEEN ? and ? order by created_Time desc ;`;
  // console.log(sql);
  return await connection.execute(sql, [fromDate, toDate]);
};
module.exports = { getOrderreport, getApiordersProduct, getOrderreportBydate };
