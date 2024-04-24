const multer = require("multer");
const path = require("path");


const userProfileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,"../../public/assets/userprofile"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
// const upload = multer({ storage: userProfileStorage });

module.exports = {userProfileStorage};
