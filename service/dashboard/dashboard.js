const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

const getProductStock = async (storage) => {
  let sql =
    'SELECT id ,product_name,stock FROM product_master left join products_details on products_details.product_id=product_master.id where storage_id=? order by stock;	';
  return await connection.execute(sql, [storage]);
};

module.exports = { getProductStock };
