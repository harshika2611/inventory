const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

async function getTime() {

  try {
    const gettime = `SELECT created_at FROM customer_master;`
    const [result] = await connection.execute(gettime);
    return result;
  } catch (error) {
    logger.info(error);
  }

}

module.exports = { getTime }