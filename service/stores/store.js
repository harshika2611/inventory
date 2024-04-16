const { name } = require('ejs');
const connection = require('../../config/connection.js');
const logger = require('../../logs.js');
const { getCityStateId } = require('../commonFunctions/commonFunctions.js');

async function insertStoreQuery(body) {
  try {
    const insertStore = `INSERT INTO storage_space_master (name,storage_type,location_id) VALUES(?,?,?);`
    const cityStateId = await getCityStateId(body.state, body.city);
    const [result] = await connection.execute(insertStore, [body.storageName, body.storeType, cityStateId[0].city_id]);
    // console.log(result);
  } catch (error) {
    logger.logError("Insert Store: " + error);
  }
}

async function getStoreQuery() {
  try {
    const getStores = `SELECT s.id as storeId ,s.name as Storagename , option_master.value as StorageType , city_master.city_name as location FROM storage_space_master as s left join option_master on s.storage_type = option_master.id left join city_master on city_master.city_id=s.location_id where s.is_deleted=0`
    const [result] = await connection.execute(getStores);
    // console.log(result)
    return result; //return array
  } catch (error) {
    logger.logError("Get Stores: " + error);
    return [];
  }
}

async function checkStoreExistQuery(storeId) {
  try {
    const checkStore = `SELECT s.id as storeId ,s.name as Storagename , option_master.value as StorageType , option_master.id as StorageTypeId ,city_master.city_name as location  FROM storage_space_master as s left join option_master on s.storage_type = option_master.id left join city_master on city_master.city_id=s.location_id  WHERE s.id=?;`
    const [result] = await connection.execute(checkStore, [storeId]);
    // console.log(result);
    // console.log(storeId);
    return result;
  } catch (error) {
    logger.logError("Check store: " + error);
    throw error;
  }
}

async function updateStoreQuery(storeId, body) {
  try {
    const storeArray = checkStoreExistQuery(storeId);
    console.log(storeArray);

    if (storeArray.length === 0) {
      return false;
    } else {
      const updateStore = `UPDATE storage_space_master as s SET name=?, storage_type = ?, location_id=? WHERE s.id=?;`;

      const [result] = connection.execute(updateStore, [body.storageName, body.storeType, body.cityId, storeId]);
      return true;
    }
  } catch (error) {
    logger.logError("Update Customer: " + error);
    throw error;
  }
}

async function deleteStoreQuery(storeId) {
  // console.log("queryid",storeId);
  try {
    const deleteStore = `update storage_space_master set is_deleted = '1' where id = ?`;
    // console.log(deleteStore);
    const [result] = await connection.execute(deleteStore, [storeId]);
    // console.log(result);
  } catch (error) {
    logger.logError("Delete Store: " + error);
  }
}

module.exports = { insertStoreQuery, getStoreQuery, updateStoreQuery, deleteStoreQuery, checkStoreExistQuery };