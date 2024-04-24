const {
  viewProfileQuery,
  updateProfileQuery,
} = require('../../service/profile/profile');

const logger = require('../../logs');

async function viewProfile(req, res) {
  try {
    const profileDetails = await viewProfileQuery(req, res);
    return res.render('./profile/view', { profileDetails, data: req.user });
  } catch (error) {
    return res.json({ message: "Can't get profile details" });
  }
}

async function editProfile(req, res) {
  try {
    const profileDetails = await viewProfileQuery(req, res);
    res.render('./profile/edit', { profileDetails, data: req.user });
  } catch (err) {
    logger.logError(err);
  }
}

 function updateProfile(req, res) {
  try {
    // updateProfileQuery();
    if (req.file == undefined) {
      
    } else {
      
      console.log('/assets/userprofile/',req.file.filename);
    }
    // res.render('./profile/profile', { data: req.user });
    res.end("Hiii")
    // console.log("hIIIII????");
  } catch (err) {
    logger.logError(err);
  }
}

module.exports = {
  viewProfile,
  editProfile,
  updateProfile,
};
