const md5 = require("md5");
const data=require('../../config/connection');
const forgotpassService=async(body)=>{
try {
  console.log(body);
  const sault=Math.floor((Math.random()*10000)+1);
  const key=md5(sault.toString()+body.new_pass);
  console.log(key);
  console.log(sault);
  const sql0=`update users set password=?,salt=? where email=?`
  const [ans]=await data.execute(sql0,[key,sault,body.email]);
  console.log(ans);
  return ans.changedRows;
} catch (error) {
  console.log(`Error`, error)
  throw error;
}
}
module.exports={forgotpassService}