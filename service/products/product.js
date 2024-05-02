const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

const getProductDetailsService = async (productId) => {
  const sql = `
    SELECT
      pm.id,
      product_master.product_name as productname,
      product_master.sku_id as skuid,
      product_master.category_id as categoryId,
      pm.cost,
      pm.description,
      pm.is_delete as productDeleted
    FROM
      product_master as pm
        LEFT JOIN
      products_details as pd
        ON
      pm.id = pd.product_id
    WHERE
      id = ?`;
  return await connection.execute(sql, [productId]);
};

const getProduct = async (product, order, field) => {
  let Query =
    'SELECT product_master.id,product_name AS Productname,sku_id AS SKUid,option_master.value AS Category,cost AS Cost,description AS Description,product_master.is_delete FROM product_master LEFT JOIN option_master ON product_master.category_id = option_master.id';
  if (product.length > 0) {
    let sql = `${Query} where product_master.id=?`;
    return await connection.execute(sql, [product]);
  } else {
    let sql = `${Query} ORDER BY ${field} ${order};`;
    return await connection.execute(sql);
  }
};
const updateProduct = async (body, payload) => {
  const [result] = await connection.execute(
    `select * from product_master where id=?;`,
    [body.id]
  );
  if (result[0].cost != body.cost) {
    await connection.execute(
      `update product_master set is_delete=1 where id=?;`,
      [body.id]
    );
    const insertedId = await insertProductService(body);
    await connection.execute(
      `UPDATE products_details SET product_id = ? WHERE product_id = ?`,
      [insertedId, body.id]
    );
  } else {
    let [rows] = await connection.execute(
      'update product_master set product_name = ?,sku_id=?,category_id=?,cost=?,description=? where id = ?',
      [
        body.productname,
        body.skuid,
        body.category,
        body.cost,
        body.description,
        body.id,
      ]
    );
  }
  // let [rows] = await connection.execute(
  //   'INSERT INTO product_master(product_name,sku_id,category_id,cost,description) values(?,?,?,?,?)',
  //   [body.productname, body.skuid, body.category, body.cost, body.description]
  // );
  // await connection.execute(
  //   'INSERT INTO products_details(product_id,storage_id,stock) values(?,?,?)',
  //   [rows.insertId, storage, body.stock]
  // );
};

const checkProductSevice = async (body) => {
  try {
    console.log(body);
    const sql = `select product_name,sku_id from product_master where product_name=? and sku_id=?`;
    const [ans] = await connection.execute(sql, [body.productname, body.skuid]);
    console.log(ans);
    return ans;
  } catch (error) {
    console.log(error);
    logger.logError(`Error`, error);
    throw error;
  }
};

const insertProductService = async (body) => {
  try {
    const sql = `insert into product_master(product_name,sku_id,category_id,cost,description) values (?,?,?,?,?)`;
    const [ans] = await connection.execute(sql, [
      body.productname,
      body.skuid,
      body.category,
      body.Price,
      body.description,
    ]);
    console.log(ans.insertId, 'insert');
    return ans.insertId;
  } catch (error) {
    console.log(error);
    logger.logError(`Error`, error);
    throw error;
  }
};

const deleteMainProductService = async (id) => {
  try {
    const sql = `UPDATE product_master 
    SET 
    is_delete = ?
    WHERE
        id = ?`;

    const [result] = await connection.execute(sql, [1, id]);
    return result;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

module.exports = {
  deleteMainProductService,
  getProduct,
  updateProduct,
  checkProductSevice,
  insertProductService,
  getProductDetailsService,
};
