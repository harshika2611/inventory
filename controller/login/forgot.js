const { logError } = require('../../logs');
const logger = require('../../logs');
const { forgotPassService } = require('../../service/login/forgot');

const getForgot = async (req, res) => {
	res.render('login/forgot');
};

const forgotPass=async(req,res)=>{
try {
	const result=await forgotPassService(req.body);
	if (!result == 0) {
		res.status(200).send('You are successfully registerd');
	}
} catch (error) {
	logger.logError(error);
	res.status(500).json({ message: 'can`t fetch user controller' });
}
}


module.exports = { getForgot,forgotPass};
