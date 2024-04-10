const {forgotpassService}=require('../../service/login/forgot')

const getForgot=async(req,res)=>{
  res.render('login/forgot');
}

const forgotpass=async(req,res)=>{
  try {
    const user=await forgotpassService(req.body);
    console.log(user);
    if(user>0){
      console.log(req.body.new_pass,req.body.confirm_pass,"newpass");
      if(req.body.new_pass==req.body.confirm_pass){
        res.redirect(`/`);
      
      }else{
       const error_forgot="Password not matched"
       res.render('login/forgot',{error_forgot});
      }
    }else{
      const error_forgot="Invalid email"
      res.render("forgot",{error_forgot});
     }
  } catch (error) {
    
  }
}
module.exports={getForgot,forgotpass};