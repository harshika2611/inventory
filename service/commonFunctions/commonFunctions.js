const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

//async function always return promise
async function getStateQuery() {
  try {
    const getStateQuery = `SELECT * FROM state_master;`

    //array destructuring
    /**If does not want to write [result] then in this return result[0]
     * because in this response we get array that have two nested array element
     * first one is data
     * second one is schema of that table 
     */

    const [result] = await connection.execute(getStateQuery);
    // logger.info(result);
    return result;
  } catch (error) {
    logger.logError("Get State: " + error);
    return [];
  }
}


async function getCityQuery(stateName) {
  try {
    const getStateQuery = `SELECT * FROM city_master as c 
    LEFT JOIN state_master as s ON c.state_id=s.state_id 
    WHERE state_name=?`;

    const [result] = connection.execute(getStateQuery, [stateName]);
    return result;
  } catch (error) {
    logger.logError("Get City: " + error);
  }
}

module.exports = { getStateQuery, getCityQuery }