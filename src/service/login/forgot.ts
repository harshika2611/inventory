import { logger, logError } from '../../logs';
import bcrypt from 'bcrypt';
const saltRounds = 10;
import connection from '../../config/connection';
import { forgotPass } from '../../types/login/login';
import { QueryResult, ResultSetHeader } from 'mysql2';
const forgotPassService = async (body: forgotPass) => {
  try {
    const hash = await bcrypt.hash(body.new_pass, saltRounds);
    const sql0 = `update users set expiry=?, status=?,password=? where email=?`;
    const [ans] = await connection.execute<QueryResult>(sql0, [
      new Date(),
      6,
      hash,
      body.email,
    ]);
    return ans;
  } catch (error) {
    logError(error);
    throw error;
  }
};
export default forgotPassService;
