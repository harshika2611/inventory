const connection = require('../../config/connection');
const logger = require('../../logs');
const getOrderreport = async (storage) => {
  // console.log(queryDate);
  let sql = `SELECT sales_order.id as Order_Id ,sales_name as Order_Name ,customer_master.firstname as Costomer_name,option_master.value as Order_Status,amount as Order_Amount,pay.value as Payment_Status ,order_date,sales_order.created_at as created_Time  FROM sales_order left join customer_master on sales_order.customer_id=customer_master.id left join option_master on sales_order.type=option_master.id left join option_master as pay on sales_order.payment_status=pay.id`;
  if (storage) {
    return await connection.execute(
      `${sql} where storage_id=? order by created_Time desc;`,
      [storage]
    );
  } else {
    return await connection.execute(`${sql} order by created_Time desc;`);
  }
};

const getApiordersProduct = async (id) => {
  // console.log(product);
  let sql = `SELECT sales_products.product_id,product_master.product_name,product_master.cost as Product_cost,sales_products.quantity FROM sales_products left join sales_order on sales_products.order_id=sales_order.id left join product_master on sales_products.product_id=product_master.id where sales_order.id=?;`;

  // console.log(sql);
  return await connection.execute(sql, [id]);
};

const getOrderreportBydate = async (fromDate, toDate, storage) => {
  let sql = `	SELECT sales_order.id as Order_Id ,sales_name as Order_Name ,customer_master.firstname as Costomer_name,option_master.value as Order_Status,amount as Order_Amount,pay.value as Payment_Status ,order_date,sales_order.created_at as created_Time  FROM sales_order left join customer_master on sales_order.customer_id=customer_master.id left join option_master on sales_order.type=option_master.id left join option_master as pay on sales_order.payment_status=pay.id where sales_order.created_at BETWEEN ? and ? `;
  // console.log(sql);
  if (storage) {
    return await connection.execute(
      `${sql}  and storage_id=? order by created_Time desc;`,
      [fromDate, toDate, storage]
    );
  } else {
    return await connection.execute(`${sql} order by created_Time desc;`, [
      fromDate,
      toDate,
    ]);
  }
};
const getOrderDayreport = async (datetype, date, storage) => {
  let sql = `SELECT sales_order.id as Order_Id ,sales_name as Order_Name ,customer_master.firstname as Costomer_name,option_master.value as Order_Status,amount as Order_Amount,pay.value as Payment_Status ,order_date,sales_order.created_at as created_Time  FROM sales_order left join customer_master on sales_order.customer_id=customer_master.id left join option_master on sales_order.type=option_master.id left join option_master as pay on sales_order.payment_status=pay.id where ${datetype}(sales_order.created_at)=? and sales_order.type=8 and sales_order.payment_status=11`;
  if (storage) {
    return await connection.execute(
      `${sql}  and storage_id=? order by created_Time desc;`,
      [date, storage]
    );
  } else {
    return await connection.execute(`${sql} order by created_Time desc;`, [
      date,
    ]);
  }
};
module.exports = {
  getOrderreport,
  getApiordersProduct,
  getOrderreportBydate,
  getOrderDayreport,
};
