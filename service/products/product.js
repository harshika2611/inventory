const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

const getProductDetailsService = async (
  productId,
  order,
  field,
  storage,
  payload
) => {
  const sql = `
    SELECT
      id,
      product_master.product_name as productname,
      product_master.sku_id as skuid,
      product_master.category_id as categoryId,
      cost,
      description
    FROM
      product_master
    WHERE
      id = ?`;
  return await connection.execute(sql, [productId]);
};

const getProduct = async (product, order, field, storage, payload) => {
  let Query =
    'SELECT product_master.id,product_name as Productname,sku_id as SKUid,option_master.value as Category ,cost as Cost,stock as Quantity,description as Description,is_delete FROM product_master left join products_details on product_master.id=products_details.product_id left join option_master on product_master.category_id =option_master.id  where';
  if (product.length > 0) {
    let sql = `${Query} product_master.id=? and storage_id=? `;
    return await connection.execute(sql, [
      product,
      payload.roleId == 4 ? storage : payload.storageId,
    ]);
  } else {
    let sql = `${Query}  storage_id= ? ORDER BY ${field} ${order};`;
    return await connection.execute(sql, [
      payload.roleId == 4 ? storage : payload.storageId,
    ]);
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
      body.cost,
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
const insertProductDetailService = async (result, body, payload) => {
  try {
    console.log(payload.storageId, 'what');
    const sql1 = `insert into products_details(product_id,storage_id,
      stock) values (?,?,?)`;
    const [ans1] = await connection.execute(sql1, [
      result,
      payload.roleId == 4 ? body.storageIn : payload.storageId,
      body.Stock,
    ]);
    return ans1;
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
  insertProductDetailService,
  insertProductService,
  getProductDetailsService,
};
