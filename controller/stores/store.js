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
		res.redirect('/store')
	} catch (error) {
		// return res.status(500).json({ message: 'Unable to insert' });
	}
}

async function getStore(req, res) {
	try {
		const storeDetails = await getStoreQuery();
		for (let element of storeDetails) {
			const created_at = element.Created;
			const updated_at = element.Updated;

			if (created_at === updated_at) {
				element.Updated = "-"
			}
		}
		res.render('stores/store', { storeDetails: storeDetails });

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
		const updateStoreStatus = await updateStoreQuery(
			storeId,
			storeDetails
			);
			console.log(updateStoreStatus);

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
			// window.location.reload('/store')
	} catch (error) {
		return res.status(500).json({ message: 'Unable to delete' });
	}
}

module.exports = { insertStore, getStore, updateStore, deleteStore, getParticularStore };
