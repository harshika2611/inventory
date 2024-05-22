import { RowDataPacket } from 'mysql2';
import connection from '../../config/connection';
import { logger, logError } from '../../logs';

interface Product {
  categoryName: string;
  databaseObject: {
    [key: string]: string;
  };
}

async function productGenerateReport(
  productReportObject: Product,
  storageId: number
) {
  try {
    const databaseObject = productReportObject.databaseObject;
    const categoryName = productReportObject.categoryName;

    let dataShowString = '';
    for (let key in databaseObject) {
      for (let element of databaseObject[key]) {
        dataShowString += `${key}.${element},`;
      }
    }

    const productReportQuery = `SELECT ${dataShowString.slice(0, -1)} 
      FROM product_master
      LEFT JOIN products_details ON product_master.id=products_details.product_id
      LEFT JOIN option_master ON product_master.category_id = option_master.id
      LEFT JOIN select_master ON option_master.select_id = select_master.id
      WHERE option_master.value=? AND products_details.storage_id = ? AND product_master.is_delete=?`;

    const [result] = await connection.execute<RowDataPacket[]>(
      productReportQuery,
      [categoryName, storageId, 0]
    );
    return result;
  } catch (error) {
    logError('Product Report: ' + error);
    throw error;
  }
}

async function productOutOfStockGenerateReport(
  productReportObject: { [key: string]: string },
  storageId: number
) {
  try {
    const maximumQunatity = productReportObject.maximumQunatity;
    const categoryName = productReportObject.categoryName;

    const productReportQuery = `SELECT product_master.product_name,product_master.sku_id,products_details.stock
      FROM product_master
      LEFT JOIN products_details ON product_master.id=products_details.product_id
      LEFT JOIN option_master ON product_master.category_id = option_master.id
      LEFT JOIN select_master ON option_master.select_id = select_master.id
      WHERE option_master.value=? AND products_details.storage_id = ? AND products_details.stock <= ? AND product_master.is_delete=?`;

    const [result] = await connection.execute<RowDataPacket[]>(
      productReportQuery,
      [categoryName, storageId, maximumQunatity, 0]
    );
    return result;
  } catch (error) {
    logError('Product Out Of Stock Report: ' + error);
    throw error;
  }
}

async function storageDetails(storageId: number) {
  try {
    if (!storageId) {
      const storageDetails = `SELECT s.id as storageId,s.name as StorageName,o.value as StorageType 
      FROM storage_space_master as s
      LEFT JOIN option_master as o ON s.storage_type=o.id
      LEFT JOIN city_master as c ON s.location_id=c.city_id
      LEFT JOIN state_master as st ON c.state_id=st.state_id
      WHERE s.is_delete=?`;
      const [result] = await connection.execute<RowDataPacket[]>(
        storageDetails,
        [0]
      );
      return result;
    } else {
      const storageDetails = `SELECT s.name as StorageName,o.value as StorageType,c.city_name as City,st.state_name as State 
    FROM storage_space_master as s
    LEFT JOIN option_master as o ON s.storage_type=o.id
    LEFT JOIN city_master as c ON s.location_id=c.city_id
    LEFT JOIN state_master as st ON c.state_id=st.state_id
    WHERE s.id=? AND s.is_delete=?`;
      const [result] = await connection.execute<RowDataPacket[]>(
        storageDetails,
        [storageId, 0]
      );
      return result;
    }
  } catch (error) {
    throw error;
  }
}

export {
  productGenerateReport,
  productOutOfStockGenerateReport,
  storageDetails,
};
