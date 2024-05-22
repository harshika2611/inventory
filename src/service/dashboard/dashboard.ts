import { RowDataPacket } from 'mysql2';
import connection from '../../config/connection';
import { logger, logError } from '../../logs';

const getProductStock = async (storage: number | null) => {
  let Query =
    'SELECT product_name as Product,stock as Stock FROM product_master left join products_details on products_details.product_id=product_master.id';
  if (storage) {
    return await connection.execute<RowDataPacket[]>(
      `${Query}  where storage_id=? order by stock;`,
      [storage]
    );
  } else {
    return await connection.execute(`${Query} order by stock`);
  }
};

export default getProductStock;
