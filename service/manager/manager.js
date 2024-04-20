const { logError } = require('../../logs');
const logger = require('../../logs.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const connection = require('../../config/connection');

const storeComboServices = async () => {
  try {
    const sql4 = `SELECT storage_space_master.id,city_master.city_name FROM storage_space_master join city_master on storage_space_master.location_id=city_master.city_id;`;
    const [result4] = await connection.execute(sql4);
    return result4;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const listManagersService = async (status, order, field) => {
  try {
    const sql0 = `SELECT 
    users.id,
    firstname AS Firstname,
    lastname AS Lastname,
    email AS Email,
    name AS Place,
    city_name AS Location,
    option_master.value as Status,
    users.created_at AS Created,
    users.updated_at AS Updated
FROM
    users
        JOIN
    manager_details ON users.id = manager_details.user_id
        JOIN
    storage_space_master ON storage_space_master.id = manager_details.storage_id
        JOIN
    city_master ON city_master.city_id = storage_space_master.location_id
        JOIN
    option_master ON option_master.id = users.status
WHERE
  option_master.value =?
        AND manager_details.is_delete = ?
ORDER BY ${field} ${order}`;
    console.log(status, 'con');
    const [ans] = await connection.execute(sql0, [status, 0]);
    return ans;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const getPerticularManagerService = async (id) => {
  try {
    const sql1 = `SELECT 
    users.id,
    firstname,
    lastname,
    email,
    name ,
    city_name,
    users.created_at AS Created,
    users.updated_at AS Updated
FROM
    users
        JOIN
    manager_details ON users.id = manager_details.user_id
        JOIN
    storage_space_master ON storage_space_master.id = manager_details.storage_id
        JOIN
    city_master ON city_master.city_id = storage_space_master.location_id
WHERE
    status = ?
        AND manager_details.is_delete = ?
        AND users.id = ?;`;
    const [ans1] = await connection.execute(sql1, [6, 0, id]);
    return ans1;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const checkUpdateManagerService = async (body) => {
  try {
    const sql0 = `select email from users where email=? and id != ?`;
    const [result] = await connection.execute(sql0, [body.email, body.id]);
    return result;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const updateManagerService = async (otp, body) => {
  try {
    const sql1 = `update users set firstname=?,lastname=?,email=? where id=?;`;
    const [result] = await connection.execute(sql1, [
      body.firstname,
      body.lastname,
      body.email,
      body.id,
    ]);
    console.log(result);
    return result;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const checkManagerService = async (body) => {
  try {
    const sql0 = `select email from users where email=?`;
    const [result] = await connection.execute(sql0, [body.email]);
    return result;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const insertManagerService = async (otp, body) => {
  try {
    const sql2 = `insert into users (role_id,firstname,lastname,email,unique_code,expiry,status)
		values (?,?,?,?,?,?,?)`;

    const [ans1] = await connection.execute(sql2, [
      5,
      body.firstname,
      body.lastname,
      body.email,
      otp,
      new Date(),
      7,
    ]);
    return ans1.insertId;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};
const insertManagerDetail = async (result2, body) => {
  try {
    const sql3 = `INSERT INTO manager_details (user_id,storage_id)
		values(?,?)`;
    const [ans2] = await connection.execute(sql3, [result2, body.state]);
    return ans2;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const deleteManagerService = async (id) => {
  try {
    const sql0 = `UPDATE manager_details 
   SET 
       is_delete = ?
   WHERE
      user_id = ?`;
    const [result] = await connection.execute(sql0, [1, id]);
    return result;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

module.exports = {
  deleteManagerService,
  checkUpdateManagerService,
  getPerticularManagerService,
  storeComboServices,
  insertManagerDetail,
  checkManagerService,
  listManagersService,
  updateManagerService,
  insertManagerService,
};
