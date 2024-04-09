const { Strategy,ExtractJwt} = require('passport-jwt');
require("dotenv").config();
const data=require('../config/connection');
const { SECRET_KEY } = process.env;

 const cookieExtractor=function(req){
  if(req && req.cookies){
    var token=req.cookies?.token;
  }
  return token;
}


const auth = passport =>{
  // console.log(passport,"aaaaaa");
  const options={};
  options.jwtFromRequest=cookieExtractor;
  options.secretOrKey=SECRET_KEY
  passport.use(
    new Strategy(options, async(payload,done)=>{
      const [result]=await data.execute("select * from users where email=?",[payload.email]);
      if(result.length>0){
        return done(null,{
          email:result[0].email,  
        })
      }
      return done(null,false);
    
    })

  )
}

module.exports={auth};