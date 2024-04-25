const connection = require('../../config/connection');
const logError = require('../../logs.js').logError;

async function getAllNotifications() {
  try {
    const [results] = await connection.execute(
      'SELECT * FROM logs WHERE notify = 1 ORDER BY created_at desc'
    );
    return results;
  } catch (error) {
    logError(error);
    return [];
  }
}

async function getUnseenNotifications() {
  try {
    const [results] = await connection.execute(
      'SELECT * FROM logs WHERE notify = 1 AND seen = 0'
    );
    return results;
  } catch (error) {
    logError(error);
    return [];
  }
}

async function readNotifications() {
  try {
    const [results] = await connection.execute(
      'UPDATE logs SET seen = 1 WHERE notify = 1 AND seen = 0'
    );
    return results;
  } catch (error) {
    logError(error);
    return [];
  }
}

module.exports = {
  getAllNotifications,
  getUnseenNotifications,
  readNotifications,
};
