import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connection from '../../config/connection';
import { logger, logError } from '../../logs';
import { getCityStateId } from '../commonFunctions/commonFunctions';
import { customerDetail } from '../../controller/manageCustomers/manageCustomers';

async function insertCustomerQuery(body: customerDetail) {
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
    logError('Insert Customer: ' + error);
    throw error;
  }
}

async function insertCustomerFromFileQuery(customerArray: RowDataPacket[]) {
  try {
    const insertCustomer =
      'INSERT INTO customer_master(firstname,lastname,email,phonenumber,address,zipcode,city_id,state_id) VALUES (?,?,?,?,?,?,?,?)';

    for (let element of customerArray) {
      const [result] = await connection.execute(insertCustomer, [
        element[0],
        element[1],
        element[2],
        element[3],
        element[4],
        element[5],
        element[6],
        element[7],
      ]);
    }
  } catch (error) {
    logError('Insert Customer: ' + error);
    throw error;
  }
}

async function getCustomersQuery(customerStatus: string) {
  try {
    const getCustomers = `SELECT  c.id as CustomerId,c.firstname as Firstname,c.lastname as Lastname,c.email as Email,
    c.phonenumber as Phonenumber,c.zipcode as Zipcode,city_master.city_name as City,
    state_master.state_name as State,c.created_at as Created,c.updated_at as Updated
    FROM customer_master as c
    LEFT JOIN city_master ON c.city_id = city_master.city_id
    LEFT JOIN state_master ON c.state_id = state_master.state_id
    WHERE c.is_delete = ?`;

    const [result] = await connection.execute(getCustomers, [customerStatus]);
    return result; //return array
  } catch (error) {
    throw error;
  }
}

async function checkCustomerExistQuery(customerId: string | undefined) {
  try {
    const checkCustomer = `SELECT  c.id,c.firstname,c.lastname,c.email,c.phonenumber,c.address,c.zipcode,city_master.city_name as city,state_master.state_name as state 
    FROM customer_master as c
    LEFT JOIN city_master ON c.city_id = city_master.city_id
    LEFT JOIN state_master ON c.state_id = state_master.state_id
    WHERE id=?;`;

    const [result] = await connection.execute<RowDataPacket[]>(checkCustomer, [
      customerId,
    ]);
    return result;
  } catch (error) {
    logError('Check customer: ' + error);
    throw error;
  }
}

async function updateCustomerQuery(body: customerDetail) {
  try {
    const customerId = body.customerId;
    const customerArray = await checkCustomerExistQuery(customerId);
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
    logError('Update Customer: ' + error);
    throw error;
  }
}

async function deleteCustomerQuery(customerId: string | undefined) {
  try {
    const deleteCustomer = `UPDATE customer_master SET is_delete=1 WHERE id=?`;

    const [result] = await connection.execute<ResultSetHeader>(deleteCustomer, [
      customerId,
    ]);
    return result;
  } catch (error) {
    logError('Delete Customer: ' + error);
    throw error;
  }
}

async function reactivateCustomerQuery(customerId: string | undefined) {
  try {
    const reactivateCustomer = `UPDATE customer_master SET is_delete=0 WHERE id=?`;

    const [result] = await connection.execute<ResultSetHeader>(
      reactivateCustomer,
      [customerId]
    );
    return result;
  } catch (error) {
    // logError("Reactivate Customer: " + error);
    throw error;
  }
}

export {
  insertCustomerQuery,
  insertCustomerFromFileQuery,
  getCustomersQuery,
  checkCustomerExistQuery,
  updateCustomerQuery,
  deleteCustomerQuery,
  reactivateCustomerQuery,
};
