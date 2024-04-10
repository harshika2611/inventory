const md5 = require("md5");
const connection=require('../../config/connection');
const forgotpassService=async(body)=>{
try {

  const sault=Math.floor((Math.random()*10000)+1);
  const key=md5(sault.toString()+body.new_pass);
  const sql0=`update users set password=?,salt=? where email=?`
  const [ans]=await connection.execute(sql0,[key,sault,body.email]);
 
  return ans.changedRows;
} catch (error) {
  logger.logError(`Error`, error)
  throw error;
}
}
module.exports={forgotpassService}