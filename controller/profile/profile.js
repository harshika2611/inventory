const {
	viewProfileQuery,
	updateProfileQuery,
} = require('../../service/profile/profile');

const logger = require('../../logs');

async function viewProfile(req, res) {
	try {
		const profileDetails = await viewProfileQuery();
		return res.render('./profile/view', { profileDetails });
	} catch (error) {
		return res.json({ message: "Can't get profile details" });
	}
}

async function editProfile(req, res) {
	try {
		const profileDetails = await viewProfileQuery();
		res.render('./profile/edit', { profileDetails });
	} catch (err) {
		logger.logError(err);
	}
}

async function updateProfile(req, res) {
	try {
		updateProfileQuery();
		res.render('./profile/profile', {});
	} catch (err) {
		logger.logError(err);
	}
}
module.exports = {
	viewProfile,
	editProfile,
	updateProfile,
};
