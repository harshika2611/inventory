import { logger, logError } from '../../logs';
import bcrypt from 'bcrypt';
import connection from '../../config/connection';
import {
  IManager,
  IUser,
  Manager,
  Store,
  UpdateManager,
} from '../../types/manager/maanger';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
const saltRounds = 10;

const cityComboService = async () => {
  try {
    const sql = `SELECT DISTINCT
    city_master.city_id,city_master.city_name
FROM
    storage_space_master
        JOIN
    city_master ON storage_space_master.location_id = city_master.city_id and is_delete=?;`;
    const [result] = await connection.execute<IUser[]>(sql, [0]);
    return result;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const storeComboServices = async (id: string) => {
  try {
    const sql4 = `SELECT DISTINCT
    storage_space_master.id, storage_space_master.name
FROM
    storage_space_master
        JOIN
    city_master ON storage_space_master.location_id = city_master.city_id where city_master.city_id=? and is_delete=?`;
    const [result4] = await connection.execute<Store[]>(sql4, [id, 0]);
    return result4;
  } catch (error) {
    console.log(error);
    logError(error);
    throw error;
  }
};

const listManagersService = async (
  status: string,
  order: string,
  field: string
) => {
  try {
    const sql0 = `SELECT 
    users.id,
    firstname AS Firstname,
    lastname AS Lastname,
    email AS Email,
    name AS Place,
    city_name AS Location,
    option_master.value as Status,
    date(users.created_at) as Created,
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
  option_master.key =?
        AND manager_details.is_delete = ?
ORDER BY ${field} ${order}`;

    const [ans] = await connection.execute<RowDataPacket[]>(sql0, [status, 0]);

    return ans;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const getPerticularManagerService = async (id: string) => {
  try {
    const sql1 = `SELECT 
    users.id,
    firstname,
    lastname,
    email,
    name ,
    storage_space_master.id as location,
    city_id,
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
    const [ans1] = await connection.execute<RowDataPacket[]>(sql1, [6, 0, id]);
    return ans1;
  } catch (error) {
    logError(error);
    throw error;
  }
};

// const checkUpdateManagerService = async (body) => {
//   try {
//     const sql0 = `select email from users where email=? and id != ?`;
//     const [result] = await connection.execute(sql0, [body.email, body.id]);
//     return result;
//   } catch (error) {
//     logError( error);
//     throw error;
//   }
// };

const updateManagerService = async (otp: number, body: UpdateManager) => {
  try {
    // console.log(body);
    const sql1 = `update users set firstname=?,lastname=? where id=?;`;
    const [result] = await connection.execute<ResultSetHeader[]>(sql1, [
      body.firstname,
      body.lastname,
      body.id,
    ]);

    return result;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const checkManagerService = async (body: Manager) => {
  try {
    const sql0 = `select email from users where email=?`;
    const [result] = await connection.execute<IManager[]>(sql0, [body.email]);
    return result;
  } catch (error) {
    logError(error);
    throw error;
  }
};

const insertManagerService = async (otp: number, body: Manager) => {
  try {
    const sql2 = `insert into users (role_id,firstname,lastname,email,unique_code,expiry,status)
		values (?,?,?,?,?,?,?)`;

    const [ans1] = await connection.execute<ResultSetHeader>(sql2, [
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
    logError(error);
    throw error;
  }
};
const insertManagerDetail = async (result2: number, body: Manager) => {
  try {
    const sql3 = `INSERT INTO manager_details (user_id,storage_id)
		values(?,?)`;
    const [ans2] = await connection.execute<ResultSetHeader>(sql3, [
      result2,
      body.place,
    ]);
    return ans2;
  } catch (error) {
    console.log(error);
    logError(error);
    throw error;
  }
};

const deleteManagerService = async (id: string) => {
  try {
    const sql0 = `UPDATE manager_details 
   SET 
       is_delete = ?
   WHERE
      user_id = ?`;
    const [result] = await connection.execute<ResultSetHeader>(sql0, [1, id]);
    return result;
  } catch (error) {
    logError(error);
    throw error;
  }
};

export {
  cityComboService,
  deleteManagerService,
  getPerticularManagerService,
  storeComboServices,
  insertManagerDetail,
  checkManagerService,
  listManagersService,
  updateManagerService,
  insertManagerService,
};
