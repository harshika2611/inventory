const connection = require('../../config/connection.js');
const logger = require('../../logs.js');
const { getCityStateId } = require('../commonFunctions/commonFunctions.js');

async function insertCustomerQuery(body) {
  // return new Promise((resolve, reject) => {

  // });
  try {
    const insertCustomer = `INSERT INTO customer_master(firstname,lastname,email,phonenumber,address,zipcode,city_id,state_id) VALUES(?,?,?,?,?,?,?,?);`;

    const cityStateId = await getCityStateId(body.state, body.city); //array contain object

    const [result] = await connection.execute(insertCustomer, [
      body.firstname,
      body.lastname,
      body.email,
      body.phonenumber,
      body.address,
      body.zipcode,
      cityStateId[0].city_id,
      cityStateId[0].state_id,
    ]);
  } catch (error) {
    logger.logError('Insert Customer: ' + error);
    throw error;
  }
}

async function getCustomersQuery() {
  try {
    const getCustomers = `SELECT  c.id as CustomerId,c.firstname as Firstname,c.lastname as Lastname,c.email as Email,
    c.phonenumber as Phonenumber,c.zipcode as Zipcode,city_master.city_name as City,
    state_master.state_name as State,c.created_at as Created,c.updated_at as Updated
    FROM customer_master as c
    LEFT JOIN city_master ON c.city_id = city_master.city_id
    LEFT JOIN state_master ON c.state_id = state_master.state_id
    WHERE c.is_delete = '0';`;

    const [result] = await connection.execute(getCustomers);
    return result; //return array
  } catch (error) {
    logger.logError('Get Customers: ' + error);
    throw error;
    // return [];
  }
}

async function checkCustomerExistQuery(customerId) {
  try {
    const checkCustomer = `SELECT  c.id,c.firstname,c.lastname,c.email,c.phonenumber,c.address,c.zipcode,city_master.city_name as city,state_master.state_name as state 
    FROM customer_master as c
    LEFT JOIN city_master ON c.city_id = city_master.city_id
    LEFT JOIN state_master ON c.state_id = state_master.state_id
    WHERE id=?;`;

    const [result] = await connection.execute(checkCustomer, [customerId]);
    return result;
  } catch (error) {
    logger.logError('Check customer: ' + error);
    throw error;
  }
}

async function updateCustomerQuery(body) {
  try {
    const customerId = body.customerId;
    const customerArray = checkCustomerExistQuery(customerId);
    if (customerArray.length === 0) {
      return false;
    } else {
      const updateCustomer = `UPDATE customer_master SET firstname = ?, lastname=?, email=?,phonenumber=?,address=?,zipcode=?,city_id=?,state_id=? WHERE id=?;`;

      const [result] = await connection.execute(updateCustomer, [
        body.firstname,
        body.lastname,
        body.email,
        body.phonenumber,
        body.address,
        body.zipcode,
        body.city,
        body.state,
        customerId,
      ]);
      return true;
    }
  } catch (error) {
    logger.logError('Update Customer: ' + error);
    throw error;
  }
}

async function deleteCustomerQuery(customerId) {
  try {
    const deleteCustomer = `UPDATE customer_master SET is_delete=1 WHERE id=?`;

    const [result] = await connection.execute(deleteCustomer, [customerId]);
    return result;
  } catch (error) {
    logger.logError('Delete Customer: ' + error);
    throw error;
  }
}

module.exports = {
  insertCustomerQuery,
  getCustomersQuery,
  checkCustomerExistQuery,
  updateCustomerQuery,
  deleteCustomerQuery,
};
