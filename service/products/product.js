const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

const getProduct = async (product, order, field, storage) => {
  console.log(field, order);
  let Query =
    'SELECT product_master.id,product_name as Productname,sku_id as SKUid,option_master.value as Category ,cost as Cost,stock as Quantity,description as Description FROM product_master left join products_details on product_master.id=products_details.product_id left join option_master on product_master.category_id =option_master.id  where';
  if (product.length > 0) {
    let sql = `${Query} product_master.id=? and storage_id=? `;
    return await connection.execute(sql, [product, storage]);
  } else {
    let sql = `${Query}  storage_id= ? ORDER BY ${field} ${order};`;
    return await connection.execute(sql, [storage]);
  }
};

const checkProductSevice = async (body) => {
  try {
    console.log(body);
    const sql = `select product_name from product_master where product_name=?`;
    const [ans] = await connection.execute(sql, [body.productname]);
    console.log(ans);
    return ans;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const insertProductService = async (req, res) => {
  try {
    const sql = `insert into product_master(product_name,sku_id,cost)`;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

module.exports = { checkProductSevice, getProduct, insertProductService };
