import { User, IUser, expireUser } from '../../types/login/login';
import connection from '../../config/connection';
import { logger, logError } from '../../logs';

const userLoginService = async (body: User) => {
  try {
    const sql0 = `SELECT 
    users.id, email, password, created_at, status, role_id, expiry,storage_id,manager_details.is_delete, users.img_path as \`dp\`
FROM
    users
       LEFT JOIN
    manager_details ON users.id = manager_details.user_id
WHERE
    email =?`;
    const [result] = await connection.execute<IUser[]>(sql0, [body.email]);
    return result;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const getDp = async (id: string) => {
  try {
    const sql0 = `SELECT 
        users.img_path as \`dp\`
    FROM
        users
    WHERE
        id =?`;
    const [result] = await connection.execute<IUser[]>(sql0, [id]);
    return result;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const logsService = async (id: number): Promise<void> => {
  try {
    const sql1 = `insert into logs(user_id,type_id)
    values (?,?)`;
    const [result1] = await connection.execute(sql1, [id, 12]);
  } catch (error) {
    logError(error);
    throw error;
  }
};

const logUnsuccessService = async (id: number): Promise<void> => {
  try {
    const sql2 = `insert into logs(user_id,type_id)
    values (?,?)`;

    const [result1] = await connection.execute(sql2, [id, 13]);
  } catch (error) {
    logError(error);
    throw error;
  }
};

const checkUserService = async (body: User) => {
  try {
    if (body?.email) {
      const sql4 = `select email,id from users where email=?`;
      const [result4] = await connection.execute<IUser[]>(sql4, [body.email]);
      console.log(result4);
      return result4;
    } else {
      const sql4 = `select email from users where unique_code=? and id=?`;
      const [result4] = await connection.execute<IUser[]>(sql4, [
        body?.link,
        body?.userId,
      ]);

      await connection.execute<IUser[]>(
        `update users set unique_code = NULL where id = ?`,
        [body?.userId]
      );
      return result4;
    }
  } catch (error) {
    logError(error);
    throw error;
  }
};
const userService = async (otp: number, body: User) => {
  try {
    const sql5 = `update users set unique_code=? where email=?`;
    const [result5] = await connection.execute<IUser[]>(sql5, [
      otp,
      body.email,
    ]);
    return result5;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const expireService = async (data: expireUser) => {
  try {
    const sql6 = `select updated_at from users where unique_code=? and id = ?`;
    const [result6] = await connection.execute<IUser[]>(sql6, [
      data.link,
      data.id,
    ]);
    return result6;
  } catch (error) {
    logError(error);
    throw error;
  }
};
const checkExpireService = async (data: expireUser) => {
  try {
    const sql = `update users set unique_code=? where id=?`;
    const [result] = await connection.execute(sql, [data.otp, data.id]);
  } catch (error) {
    logError(error);
    throw error;
  }
};

export {
  checkExpireService,
  expireService,
  userService,
  checkUserService,
  userLoginService,
  logsService,
  logUnsuccessService,
  getDp,
};
