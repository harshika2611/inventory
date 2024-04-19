const connection = require('../../config/connection');
const logger = require('../../logs');
const { logError } = require('../../logs');

const userLoginService = async (body) => {
  try {
    const sql0 = `SELECT 
    users.id, email, password, created_at, status, role_id, expiry,storage_id
FROM
    users
<<<<<<< HEAD
      LEFT JOIN
=======
       LEFT JOIN
>>>>>>> main
    manager_details ON users.id = manager_details.user_id
WHERE
    email =?`;
    const [result] = await connection.execute(sql0, [body.email]);

    return result;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const logsService = async (id) => {
  try {
    const sql1 = `insert into logs(user_id,type_id)
    values (?,?)`;

    const [result1] = await connection.execute(sql1, [id, 12]);
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const logUnsuccessService = async (id) => {
  try {
    const sql2 = `insert into logs(user_id,type_id)
    values (?,?)`;

    const [result1] = await connection.execute(sql2, [id, 13]);
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const checkUserService = async (body) => {
  try {
    const sql4 = `select email from users where email=?`;
    const [result4] = await connection.execute(sql4, [body.email]);
    return result4;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};
const userService = async (otp, body) => {
  try {
    const sql5 = `update users set unique_code=? where email=?`;
    const [result5] = await connection.execute(sql5, [otp, body.email]);
    return result5;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

const expireService = async (link) => {
  try {
    const sql6 = `select updated_at from users where unique_code=?`;
    const result6 = await connection.execute(sql6, [link]);
    return result6;
  } catch (error) {
    logger.logError(`Error`, error);
    throw error;
  }
};

module.exports = {
  expireService,
  userService,
  checkUserService,
  userLoginService,
  logsService,
  logUnsuccessService,
};
