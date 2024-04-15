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
    const getStores = `SELECT * FROM storage_space_master inner join option_master on storage_space_master.storage_type = option_master.id inner join city_master on city_master.city_id=storage_space_master.location_id`
    const [result] = await connection.execute(getStores);
    // console.log(result)
    return result; //return array
  } catch (error) {
    logger.logError("Get Stores: " + error);
    return [];
  }
}

async function updateStoreQuery(name, body) {
  try {
    const updateStore = `UPDATE storage_space_master SET name=?, storage_type = ?, location_id=? WHERE name=?;`
    const cityStateId = await getCityStateId(body.state, body.city);
    const [result] = connection.execute(updateStore,[body.storageName, body.storeType, cityStateId[0].city_id]);
    return true;
  } catch (error) {
    logger.logError("Update Store: " + error);
  }
}

async function deleteStoreQuery(name) {
  try {
    const deleteStore = `DELETE FROM storage_space_master WHERE name=?`;
    const [result] = await connection.execute(deleteStore, name);
  } catch (error) {
    logger.logError("Delete Customer: " + error);
  }
}

module.exports = { insertStoreQuery, getStoreQuery, updateStoreQuery, deleteStoreQuery };