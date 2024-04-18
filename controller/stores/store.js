const { checkLogin } = require('../../middleware/auth');
const logger = require('../../logs.js');
const {
  insertStoreQuery,
  getStoreQuery,
  updateStoreQuery,
  deleteStoreQuery,
  checkStoreExistQuery

} = require('../../service/stores/store');

async function insertStore(req, res) {
  try {
    const storeDetails = req.body;
    console.log(storeDetails);
    await insertStoreQuery(storeDetails);
    return res.json({ status: 200 })
  } catch (error) {
    // return res.status(500).json({ message: 'Unable to insert' });
  }
}

async function getStorePage(req, res) {
  res.render('stores/store');
}

async function getStore(req, res) {
  try {
    const storeDetails = await getStoreQuery();

    return res.status(200).json(storeDetails);
  } catch (error) {
    return res.status(404).json({ message: "Can't get stores" });
  }
}

async function getParticularStore(req, res) {
  try {
    const queryString = req.query;
    // logger.info(queryString.customerId);
    // console.log(queryString)
    const storeDetail = await checkStoreExistQuery(queryString.storeId);
    if (storeDetail.length !== 0) {
      return res.status(200).json(storeDetail);
    } else {
      return res.status(404).json({ message: "Store Not Found" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something Went Wrong" });
  }
}



async function updateStore(req, res) {
  try {
    const storeDetails = req.body;
    const storeId = req.query.storeId;
    // const cityStateIdArray = await getCityStateId(storeDetails.state, storeDetails.city);

    //----city, state id store
    // let cityId = cityStateIdArray[0].city_id;
    // let stateId = cityStateIdArray[0].state_id;
    // storeDetails.city = cityId.toString();
    // storeDetails.state = stateId.toString();
    const updateStoreStatus = await updateStoreQuery(storeDetails, storeId);

    if (updateStoreStatus) {
      return res.status(200).json({ message: 'Store Updated' });
    } else {
      return res.status(404).json({ message: 'Something went wrong' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update' });
  }
}

async function deleteStore(req, res) {
  try {
    const storeId = req.query.storeId;
    await deleteStoreQuery(storeId);
    window.location.reload('/store')
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete' });
  }
}


async function filterStore(req, res) {
  try {
  } catch (error) { }
}
module.exports = { insertStore, getStore, getStorePage, updateStore, deleteStore, getParticularStore, filterStore };
