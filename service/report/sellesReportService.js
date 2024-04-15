const connection = require("../../config/connection");
const getProductreport = async () => {
  let sql =
    "SELECT  product_master.id, product_master.product_name,product_master.sku_id as product_skuid,product_master.cost as product_cost,product_master.selling_cost as sell_Price,sum(sales_products.quantity) as productSalles FROM inventory_management.product_master left join sales_products on product_master.id =sales_products.product_id group by product_master.id order by productSalles DESC;";
  return await connection.execute(sql);
};
const getCategotyreport = async () => {
  let sql =
    "SELECT  option_master.id,option_master.value as category_name,count(*) as Products,sum(sales_products.quantity) as sells FROM product_master left join option_master on product_master.category_id=option_master.id left join sales_products on product_master.id =sales_products.product_id group by option_master.id order by Products DESC;";
  return await connection.execute(sql);
};
module.exports = { getProductreport, getCategotyreport };
