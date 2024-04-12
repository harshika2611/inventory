const logger = require('../../logs.js');
const { getStateQuery, getCityQuery } = require('../../service/commonFunctions/commonFunctions.js');

async function getState(req, res) {
  try {
    const stateArray = await getStateQuery();
    // return res.status(200).json({ stateArray: stateArray });
    // logger.info(Array.isArray(stateArray));
    console.log(stateArray);
    if (stateArray.length === 0) {
      return res.status(500).json({ message: "Something Went Wrong" });
    } else {
      return res.status(200).json({ stateArray: stateArray });
    }
  } catch (error) {
    logger.logError(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
}


function getCity(req, res) {
  try {
    const stateName = req.body;
    logger.info("State Name " + stateName);
    const cityArray = getCityQuery(stateName);
    return res.status(200).json({ cityArray: cityArray });
  } catch (error) {
    return res.status(500).json({ message: "Something Went Wrong" });
  }
}


module.exports = { getState, getCity }