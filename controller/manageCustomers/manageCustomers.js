const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

async function insertCustomer(body) {
  try {
    const insertCustomer = `INSERT INTO customer_master VALUES(?,?,?,?,?,?,?,?,?);`

    const [result] = await connection.execute(insertCustomer, [body.fname, body.lname, body.email, body.phonenumber, body.email, body.address, body.zipcode, body.cityId, body.stateId]);
  } catch (error) {
    logger.logError("Insert Customer: " + error);
  }
}

async function getCustomers() {
  try {
    const getCustomers = `SELECT * FROM customer_master;`

    const [result] = await connection.execute(getCustomers);
    return result;
  } catch (error) {
    logger.logError("Get Customers: " + error);
    return [];
  }
}
module.exports = { insertCustomer, getCustomers };