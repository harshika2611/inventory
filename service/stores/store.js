const { name } = require('ejs');
const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

async function insertStoreQuery(body) {
  try {
    const insertStore = `INSERT INTO storage_space_master (name,storage_type,location_id) VALUES(?,?,?);`
    const [result] = await connection.execute(insertStore, [body.storageName, body.storeType, body.location]);
    // console.log(result);
  } catch (error) {
    logger.logError("Insert Store: " + error);
  }
}

async function getStoreQuery() {
  try {
    const getStores = `SELECT * FROM storage_space_master inner join option_master on storage_space_master.storage_type = option_master.id;`

    const [result] = await connection.execute(getStores);
    // console.log(result)
    return result; //return array
  } catch (error) {
    logger.logError("Get Stores: " + error);
    return [];
  }
}

async function checkStoreExistQuery(name) {
  try {
    const checkStore = `SELECT * FROM storage_space_master WHERE name=?;`
    const [result] = await connection.execute(checkStore, [name]);
    return result;
  } catch (error) {
    logger.logError("Check store: " + error);
  }
}

async function updateStoreQuery(name, body) {
  try {
    const storeArray = checkStoreExistQuery(name);
    if (storeArray.length === 1) {
      return false;
    } else {
      const updateStore = `UPDATE storage_space_master SET name=? storage_type = ?, location_id=? WHERE name=?;`
      const [result] = connection.execute(updateStore, [body.storagename, body.storagetype, body.location]);
      // console.log(result, "result");
      return true;
    }
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