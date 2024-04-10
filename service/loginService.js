const data=require('../config/connection');
const logger = require('../logs');
const { logError } = require('../logs');


const userLoginService=async(body)=>{
  try {
   
    const sql0=`select email,password,salt,created_at,status,role_id from users where email=?`
    const [result]=await data.execute(sql0,[body.email]); 
    return result;
  } catch (error) {
    console.log(`Error`, error)
    throw error;
  }
}
module.exports={userLoginService}