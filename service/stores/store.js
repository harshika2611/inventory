const { name } = require('ejs');
const connection = require('../../config/connection.js');
const logger = require('../../logs.js');
const { getCityStateId } = require('../commonFunctions/commonFunctions.js');

async function insertStoreQuery(body) {
  try {
    const insertStore = `INSERT INTO storage_space_master (name,storage_type,location_id) VALUES(?,?,?);`;
    const cityStateId = await getCityStateId(body.state, body.city);
    const [result] = await connection.execute(insertStore, [
      body.storageName,
      body.storeType,
      cityStateId[0].city_id,
    ]);
    // console.log(result);
  } catch (error) {
    logger.logError('Insert Store: ' + error);
  }
}

async function getStoreQuery() {
  try {
    const getStores = `SELECT s.id as storeId ,s.name as StorageName, s.is_delete , option_master.value as StorageType , city_master.city_name as Location,s.created_at as CreatedTime FROM storage_space_master as s left join option_master on s.storage_type = option_master.id left join city_master on city_master.city_id=s.location_id`;

    const [result] = await connection.execute(getStores);
    // console.log(result)
    return result; //return array
  } catch (error) {
    logger.logError('Get Stores: ' + error);
    return [];
  }
}

async function checkStoreExistQuery(storeId) {
  try {
    const checkStore = `SELECT s.id as storeId ,s.name as Storagename , option_master.value as StorageType ,option_master.id as StorageTypeId ,state_master.state_name as state,city_master.city_name as city FROM storage_space_master as s left join option_master on s.storage_type = option_master.id left join city_master on city_master.city_id=s.location_id left join state_master on state_master.state_id=city_master.state_id WHERE s.id=?;`;
    const [result] = await connection.execute(checkStore, [storeId]);
    // console.log(result);
    // console.log(storeId);
    return result;
  } catch (error) {
    logger.logError('Check store: ' + error);
    throw error;
  }
}

async function updateStoreQuery(body, storeId) {
  try {
    // console.log(storeId);
    const updateStore = `UPDATE storage_space_master as s SET s.name=?, s.storage_type = ?, s.location_id=? WHERE s.id=?;`;
    const cityStateId = await getCityStateId(body.state, body.city);
    const [result] = await connection.execute(updateStore, [
      body.storageName,
      body.storeType,
      cityStateId[0].city_id,
      storeId,
    ]);
    // console.log(result, "result");
    return true;
  } catch (error) {
    logger.logError('Update Customer: ' + error);
    throw error;
  }
}

async function deleteStoreQuery(storeId) {
  // console.log("queryid",storeId);
  try {
    const deleteStore = `update storage_space_master set is_delete = '1' where id = ?`;
    const deleteManager = `update manager_details set is_delete = '1' where storage_id = ?`;
    const deletePurchase = `update purchase_order set is_delete = '1' where storage_id = ?`;
    const deleteSales = `update sales_order set is_delete = '1' where storage_id = ?`; 
    const deleteProduct = `update products_details set is_delete='1' where storage_id = ?`;
    // console.log(deleteStore);
    const [result] = await connection.execute(deleteStore, [storeId]);
    const [result1] = await connection.execute(deleteManager, [storeId]);
    const [result2] = await connection.execute(deletePurchase, [storeId]);
    const [result3] = await connection.execute(deleteSales, [storeId]);
    const [result4] = await connection.execute(deleteProduct, [storeId]);
    // console.log(result4);
  } catch (error) {
    logger.logError('Delete Store: ' + error);
  }
}

async function storeProductQuery(storeId) { 
  try {
    const storeProducts = `SELECT users.firstname,s.name, pm.id,pm.product_name,p.stock,pm.sku_id,pm.cost,pm.description FROM storage_space_master as s left join products_details as p on s.id = p.storage_id join product_master as pm on p.product_id = pm.id join manager_details as m on s.id = m.storage_id join users on m.user_id = users.id where s.id = ? `;
    const [storeResult] = await connection.execute(storeProducts, [storeId]); 
    return storeResult;
  }catch (error) {
    logger.logError('Product Store: ' + error);
  }
}
module.exports = {
  insertStoreQuery,
  getStoreQuery,
  updateStoreQuery,
  deleteStoreQuery,
  checkStoreExistQuery,
  storeProductQuery
};
