const {
  viewProfileQuery,
  updateProfileQuery,
} = require('../../service/profile/profile');

const logger = require('../../logs');
const { refreshToken } = require('../login/login');

function renderTimestamp(databaseDate) {
  const storedDate = new Date(databaseDate);

  return storedDate.toDateString();
}

async function viewProfile(req, res) {
  try {
    const profileDetails = await viewProfileQuery(req?.user?.id);
    profileDetails[0][0].dob = renderTimestamp(profileDetails[0][0].dob);
    return res.render('./profile/view', { profileDetails, data: req.user });
  } catch (error) {
    logger.logError(err);
    return res.json({ message: "Can't get profile details" });
  }
}

async function editProfile(req, res) {
  try {
    const profileDetails = await viewProfileQuery(req?.user?.id);
    profileDetails[0][0].dob = renderTimestamp(profileDetails[0][0].dob);
    res.render('./profile/edit', { profileDetails, data: req.user });
  } catch (err) {
    logger.logError(err);
    return res.json({ message: "Can't get profile details" });
  }
}

async function updateProfile(req, res) {
  try {
    await updateProfileQuery({
      ...req.body,
      id: req?.user?.id,
      filename: req?.file?.filename,
    });

    await refreshToken(req, res);
  } catch (error) {
    logger.logError(err);
    return res.json({ message: "Can't get profile details" });
  }
}

module.exports = {
  viewProfile,
  editProfile,
  updateProfile,
};
