const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

const getProductDetailsService = async (productId) => {
  const sql = `
  SELECT
    pm.id,
    pm.product_name as productname,
    pm.sku_id as skuid,
    pm.category_id as categoryId,
    pm.cost,
    pm.description
  FROM
    product_master as pm
  WHERE
    id = ?`;
  return await connection.execute(sql, [productId]);
};

const getProductDetailsAllService = async (productId, storageId, isAdmin) => {
  if (!isAdmin) {
    const sql = `
    SELECT
      pm.id,
      pm.product_name as productName,
      pm.sku_id as skuid,
      pm.category_id as categoryId,
      om.\`value\` AS categoryName,
      pd.stock AS stock,
      pm.cost,
      pm.description,
      pm.is_delete as productDeleted
    FROM
      product_master as pm
        LEFT JOIN
      products_details AS pd ON pm.id = pd.product_id AND pd.storage_id = ?
        LEFT JOIN
      option_master AS om ON om.id = pm.category_id
    WHERE
      pm.id = ?`;
    return await connection.execute(sql, [storageId, productId]);
  } else {
    const sql = `
    SELECT 
      pm.id,
      pm.product_name AS productName,
      pm.sku_id AS skuid,
      om2.\`value\` AS categoryName,
      pm.cost,
      pm.description,
      pm.is_delete AS productDeleted,
      pd.stock AS storageStock,
      ss.id AS storageId,
      ss.\`name\` AS storageName,
      cm.city_name AS cityName,
      om.\`value\` AS warehouseType,
      ss.is_delete AS storageDeleted
    FROM
      product_master AS pm
        LEFT JOIN
      products_details AS pd ON pm.id = pd.product_id
        LEFT JOIN
      storage_space_master AS ss ON ss.id = pd.storage_id
        LEFT JOIN
      city_master AS cm ON cm.city_id = ss.location_id
        LEFT JOIN
      option_master AS om ON om.id = ss.storage_type
        LEFT JOIN
      option_master AS om2 ON om2.id = pm.category_id
    WHERE
        pm.id = ?`;
    return await connection.execute(sql, [productId]);
  }
};

const getProduct = async (req, order, field) => {
  let sql = `SELECT 
    product_master.id,
    product_master.product_name AS Productname,
    sku_id AS SKUid,
    option_master.value AS Category,
    cost AS Cost,
    description AS Description,
    ${
      req.user.roleId == 5
        ? '(select stock from products_details where products_details.product_id = product_master.id and storage_id =' +
          req.user.storageId +
          ' ) as quantity,'
        : '(select sum(stock) from products_details where products_details.product_id = product_master.id ) as quantity,'
    }
    product_master.is_delete
FROM
    product_master
        LEFT JOIN
    option_master ON product_master.category_id = option_master.id
 ORDER BY ${field} ${order};`;
  return await connection.execute(sql);
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
    const [data] = await connection.execute(
      `update products_details set is_delete = 1 where product_id = ?`,
      [id]
    );
    logger.info(data);
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
  getProductDetailsAllService,
};
