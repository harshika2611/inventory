const pool = require('../config/connection');
const logger = require('../logs');

function getsales(req,res){
 logger.info('123')
  sql = `select * from order_master`;
  pool.query(sql,function(err,result,fields){
    if(err) throw err;
    data = result;
    
    res.json(data);
  })

}
module.exports = getsales