const logger = require('../../logs.js');
const { getStateQuery, getCityQuery } = require('../../service/commonFunctions/commonFunctions.js');

async function getState(req, res) {
  try {
    const stateArray = await getStateQuery();
    if (stateArray.length === 0) {
      return res.status(404).json({ message: "Something Went Wrong" });
    } else {
      return res.status(200).json({ stateArray: stateArray });
    }
  } catch (error) {
    logger.logError(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
}


async function getCity(req, res) {
  try {
    const stateName = req.body;
    const cityArray = await getCityQuery(stateName.state);
    if (cityArray.length === 0) {
      return res.status(404).json({ message: "Something  Went Wrong" });
    } else {
      return res.status(200).json({ cityArray: cityArray });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
}


module.exports = { getState, getCity }