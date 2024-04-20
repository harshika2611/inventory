const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

const getProduct = async (product, storage) => {
  let sql =
    'SELECT product_name,sku_id,category_id,cost,stock FROM inventory_management1.product_master left join products_details on product_master.id=products_details.product_id where id=? and storage_id=?;';
  return await connection.execute(sql, [product, storage]);
};

module.exports = { getProduct };
