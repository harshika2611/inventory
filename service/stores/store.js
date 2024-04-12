const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

async function insertStoreQuery(body) {
  try {
    const insertStore = `INSERT INTO storage_space_master (name,storage_type,location_id) VALUES(?,?,?);`
    const [result] = await connection.execute(insertStore, [body.storageName,body.storeType,body.location]);
    console.log(result);
} catch (error) {
    logger.logError("Insert Store: " + error);
  }
}

async function getStoreQuery() {
  try {
    const getStores = `SELECT storage_space_master.name , option_master.value FROM storage_space_master inner join option_master on storage_space_master.storage_type = option_master.id;`

    const [result] = await connection.execute(getStores);
    return result; //return array
  } catch (error) {
    logger.logError("Get Stores: " + error);
    return [];
  }
}

async function updateStoreQuery(body) {
  try {

    if (customerArray.length === 0) {
      return false;
    } else {
      const updateStore = `UPDATE storage_space_master SET name=? storage_type = ?, location_id=? WHERE id=?;`
      const [result] = connection.execute(updateStore, [body.storagename,body.storagetype, body.location]);
      return true;
    }
  } catch (error) {
    logger.logError("Update Store: " + error);
  }
}

module.exports = { insertStoreQuery,getStoreQuery,updateStoreQuery };