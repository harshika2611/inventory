
const connection = require('../config/connection');

async function selectQuery(table,orderby,order){

  if (order == undefined) {
    order = "asc";
  }
 
  if (orderby == undefined) {
    orderby = "id";
  }
  
  sql = `select * from ${table} order by ${orderby} ${order}`;
  return await connection.execute(sql);
  

}

async function selectWhere(name,col,value){
  let sql = `select * from ${name} where ${col}=${value}`;
  // let input = [name,col,value]
	return await connection.execute(sql);
}

module.exports = {selectQuery,selectWhere};