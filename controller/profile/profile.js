// const profileViewService = require('../../service/profile');

const logger = require("../../logs");

async function viewProfile(req, res) {
	// try {
	// 	const profileDetails = await profileViewService(req.body);
	// 	// return res.status(200).json({ data: profileDetails });
	// 	return res.status(200).render('./profile/view', { data: profileDetails });
	// } catch (error) {
	// 	return res.status(404).json({ message: "Can't get profile details" });
	// }
	try{
		res.render('./profile/view');
	}
	catch(err){
		logger.logError(err);
	}
	
}

async function editProfile(req,res){
	try{
		res.render('./profile/edit');
	}
	catch(err){
		logger.logError(err);
	}
}

module.exports = {
	viewProfile,
	editProfile,
};
