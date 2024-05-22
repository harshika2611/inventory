import mysql, { PoolOptions } from 'mysql2/promise';
import { logger } from '../logs';

const access: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

const connection = mysql.createPool(access);

connection.getConnection();
logger.info('connected..');

export default connection;
