const connection = require("../../config/connection");
const getpurchaseProductreport = async () => {
  let sql =
    "SELECT  product_master.id, product_master.product_name,product_master.sku_id as product_skuid,product_master.cost as product_cost,product_master.selling_cost as sell_Price,sum(purchase_products.quantity) as product_Purchase FROM inventory_management.product_master left join purchase_products on product_master.id =purchase_products.product_id group by product_master.id order by product_Purchase DESC;";
  return await connection.execute(sql);
};
module.exports = { getpurchaseProductreport };
