const connection = require('../../config/connection.js');
const logger = require('../../logs.js');

async function viewProfileQuery(req, res) {
  try {
    const getUser = `select firstname,lastname,dob,email,option_master.value as Role from users inner join option_master on users.role_id = option_master.id where users.email = 'admin@gmail.com';`;
    const [result] = await connection.execute(getUser);
    return [result];
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function editProfileCurrentData(req, res) {
  try {
    const getUser = `select firstname,lastname,dob,email,option_master.id as Role from users inner join option_master on users.role_id = option_master.id where users.email = 'admin@gmail.com';`;
    const [result] = await connection.execute(getUser);
    return [result];
  } catch (error) {
    return [];
  }
}

async function editProfileQuery() {
  try {
    const updateUser = `update users set firstname = ?, lastname = ?, dob = ?;`;
  } catch (error) {
    return [];
  }
}
module.exports = { viewProfileQuery };
