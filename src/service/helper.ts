import { RowDataPacket } from 'mysql2';
import connection from '../config/connection';
import { logger, logError } from '../logs';

async function getCombos(name: string) {
  try {
    const [results] = await connection.execute<RowDataPacket[]>(
      `
        SELECT
            s.id, o.id as opt_id, o.value ,o.is_delete
        FROM
            select_master AS s
                INNER JOIN
            option_master AS o ON s.id = o.select_id
        WHERE
            s.key LIKE ? AND o.is_delete = 0
    `,
      [name]
    );
    // console.log(results);
    return results;
  } catch (error) {
    logError(error);
    return [];
  }
}

export default getCombos;
