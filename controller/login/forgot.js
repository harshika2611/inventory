const { logError } = require('../../logs');
const logger = require('../../logs');
const getForgot = async (req, res) => {
	res.render('login/forgot');
};

module.exports = { getForgot};
