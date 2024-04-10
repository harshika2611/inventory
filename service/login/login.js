const data=require('../../config/connection');
const logger = require('../../logs');
const { logError } = require('../../logs');


const userLoginService=async(body)=>{
  try {
    const sql0=`select id,email,password,salt,created_at,status,role_id from users where email=?`
    const [result]=await data.execute(sql0,[body.email]); 
    console.log(result);
    return result;
  } catch (error) {
    console.log(`Error`, error)
    throw error;
  }
}

const logsService=async(id)=>{
  try {
    const sql1=`insert into logs(user_id,type_id)
    values (?,?)`
    console.log(id,"server");
    const [result1]=await data.execute(sql1,[id,12])
  } catch (error) {
    console.log(`Error`, error)
    throw error;
  }
}

const logUnsuccessService=async(id)=>{
try {
  const sql2=`insert into logs(user_id,type_id)
    values (?,?)`
    console.log(id,"server");
    const [result1]=await data.execute(sql2,[id,13])
} catch (error) {
  console.log(`Error`, error)
  throw error;
}
}


module.exports={userLoginService,logsService,logUnsuccessService}