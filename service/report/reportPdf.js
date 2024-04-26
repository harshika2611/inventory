const { json } = require('body-parser');
const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

async function productGenerateReport(productReportObject, storageId) {
  try {
    // logger.info(productReportObject);
    const databaseObject = productReportObject.databaseObject;
    const categoryName = productReportObject.categoryName;
    // logger.info(storageId);

    let dataShowString = "";
    for (let key in databaseObject) {
      for (let element of databaseObject[key]) {
        dataShowString += `${key}.${element},`;
      }
    }

    // const fromString = Object.keys(databaseObject).join(` LEFT JOIN `);
    const fromString = ``;

    const productReportQuery = `SELECT ${dataShowString.slice(0, -1)} 
    FROM product_master 
    LEFT JOIN products_details ON product_master.id=products_details.product_id
    LEFT JOIN option_master ON product_master.category_id = option_master.id
    LEFT JOIN select_master ON option_master.select_id = select_master.id
    WHERE option_master.value=? AND products_details.storage_id = ? AND product_master.is_delete=?`;
    // logger.info(productReportQuery);
    const [result] = await connection.execute(productReportQuery, [categoryName, storageId, 0]);
    // logger.info(result);
    return result;
  } catch (error) {
    logger.logError("Product Report: " + error);
    throw error;
  }
}


async function storageDetails(storageId) {
  try {
    const storageDetails = `SELECT s.name as StorageName,o.value as StorageType,c.city_name as City,st.state_name as State 
    FROM storage_space_master as s
    LEFT JOIN option_master as o ON s.storage_type=o.id
    LEFT JOIN city_master as c ON s.location_id=c.city_id
    LEFT JOIN state_master as st ON c.state_id=st.state_id
    WHERE s.id=? AND s.is_delete=?`;
    const [result] = await connection.execute(storageDetails, [storageId, 0]);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { productGenerateReport, storageDetails };