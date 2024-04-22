const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

const getProduct = async (product, storage) => {
  let Query =
    'SELECT product_name,sku_id,option_master.value as category,cost,stock,description FROM product_master left join products_details on product_master.id=products_details.product_id left join option_master on product_master.category_id =option_master.id  where';
  if (product.length > 0) {
    let sql = `${Query} product_master.id=? and storage_id=? ;`;
    return await connection.execute(sql, [product, storage]);
  } else {
    let sql = `${Query}  storage_id= ? `;
    return await connection.execute(sql, [storage]);
  }
};

module.exports = { getProduct };
