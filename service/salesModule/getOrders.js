
const connection = require('../../config/connection');
const logger = require('../../logs');

async function selectOrders(orderby,order){

  sql = `select 
    order_master.id,
    order_master.customer_id,
    customer_master.name,
    order_master.amount,
    order_master.shipping_address,
    order_master.payment_status,
    order_master.created_at
  from order_master join customer_master
  on order_master.customer_id = customer_master.id
  order by ${orderby} ${order};`;

logger.info(sql)
  return await connection.execute(sql);
  

}
module.exports = selectOrders;