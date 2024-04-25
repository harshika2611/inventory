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
    logger.info(fromString);

    // const [result] = await connection.execute(productQuery);

    // console.log(result);
    // return result;
  } catch (error) {
    logger.logError("Product Report: " + error);
    throw error;
  }
}

module.exports = { productGenerateReport };